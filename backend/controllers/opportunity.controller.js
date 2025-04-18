import sendMail from "../mail_sender/mail_sender.js";
import { Opportunity } from "../models/opportunity.model.js";
import { User } from "../models/user.model.js";
import { Unit } from "../models/unit.model.js"
import axios from "axios";
import * as cheerio from "cheerio";


export const postOpportunity = async (req, res) => {
    try {
        const { title, description, requirements, location, type, position, unitId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !location || !type || !position || !unitId) {
            return res.status(400).json({
                message: 'Please fill in all fields',
                success: false
            });
        }

        const opportunity = await Opportunity.create({
            title,
            description,
            requirements: requirements.split(", "),
            location,
            type,
            position,
            unit: unitId,
            created_by: userId
        });

        // Send email notification to the user upon successful creation of the opportunity
        const user = await User.findById(userId);
        if (user) {
            await sendMail({
                email: user.email,
                subject: 'Opportunity Posted Successfully',
                html: `
                    <h1 style="color:red>Your program has been posted!</h1>
                    <p style="font-family: Arial, sans-serif;">Hi ${user.fullname},</p>
                    <p style="font-family: Arial, sans-serif;">Your new program titled <strong>${opportunity.title}</strong> has been successfully posted.</p>
                    <p style="font-family: Arial, sans-serif;">Location: ${opportunity.location}</p>
                    <p style="font-family: Arial, sans-serif;">Type: ${opportunity.type}</p>
                    <p style="font-family: Arial, sans-serif;">Position: ${opportunity.position}</p>
                    <p style="font-family: Arial, sans-serif;">Requirements: ${opportunity.requirements.join(", ")}</p>
                    <p style="font-family: Arial, sans-serif;">Thank you for sharing this opportunity!</p>
                `
            });
        }

        return res.status(201).json({
            message: 'Post created successfully',
            opportunity,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getAllOpportunities = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const opportunities = await Opportunity.find(query).populate({
            path: "unit"
        }).sort({ createdAt: -1 });
        if (!opportunities) {
            return res.status(404).json({
                message: "Opportunities not found",
                success: false
            });
        };
        return res.status(200).json({
            opportunities,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getOpportunityById = async (req, res) => {
    try {
        const opportunityId = req.params.id;
        const opportunity = await Opportunity.findById(opportunityId).populate({
            path: "applications"
        });

        if (!opportunity) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        };
        return res.status(200).json({
            opportunity,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getAdminOpportunities = async (req, res) => {
    try {
        const adminId = req.id;
        const opportunities = await Opportunity.find({ created_by: adminId }).populate({
            path: "unit",
            createdAt: -1
        });

        if (!opportunities) {
            return res.status(404).json({
                message: "No posts created by this user.",
                success: false
            });
        };
        return res.status(200).json({
            opportunities,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateOpportunity = async (req, res) => {
    try {
        const { title, description, requirements, location, type, position } = req.body;

        const updateData = { title, description, requirements, location, type, position };
        const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!opportunity) {
            return res.status(404).json({
                message: "Program not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Program updated successfully.",
            opportunity,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const deleteOpportunity = async (req, res) => {
    try {
        const opportunityId = req.params.id;
        const deleteOpportunity = await Opportunity.findByIdAndDelete(opportunityId);

        if (!deleteOpportunity) {
            return res.status(404).json({
                message: "Program not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Program deleted successfully.",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while deleting the program.",
            success: false,
        });
    }
};


// const cheerio = require("cheerio");
// export const crawlOpportunity = async (req, res) => {
//     try {
//         const { url } = req.body.url;
//         if (!url) {
//             return res.status(400).json({ message: "URL is required", success: false });
//         }

//         // Fetch website data
//         const { data } = await axios.get(url);
//         const $ = cheerio.load(data);

//         // Modify these selectors based on the website structure
//         $(".scholarship-listing .scholarship-item").each((index, element) => {
//             const title = $(element).find(".scholarship-title").text().trim();
//             const description = $(element).find(".scholarship-description").text().trim();
//             const location = $(element).find(".scholarship-location").text().trim();
//             const type = $(element).find(".scholarship-type").text().trim();

//             scholarships.push({
//                 title,
//                 description,
//                 location,
//                 type,
//                 created_by: req.id, // Assign the logged-in user ID
//             });
//         });

//         if (scholarships.length === 0) {
//             return res.status(404).json({ message: "No scholarships found.", success: false });
//         }

//         // Insert scholarships into the database
//         const createdOpportunities = await Opportunity.insertMany(scholarships);

//         return res.status(201).json({
//             message: "Scholarships successfully crawled and added!",
//             success: true,
//             opportunities: createdOpportunities,
//         });
//     } catch (error) {
//         console.error("Scraping Error:", error);
//         return res.status(500).json({ message: "Error fetching data", success: false });
//     }
// };



export const crawlData = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ success: false, message: "URL is required." });
        }

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let scholarships = [];

        $(".grid .interactive-card").each((index, element) => {
            const titleElement = $(element).find("a.h4.font-heading");
            const title = titleElement.text().trim();
            const link = `https://www.idp.com${titleElement.attr("href")}`;
            const university = $(element).find("p.text-small.truncate a").text().trim();
            const type = $(element).find("ul li:nth-child(2) span").text().trim() || "Not specified";

            if (title && link) {
                scholarships.push({
                    title,
                    university,
                    link,
                    type
                });
            }
        });

        for (let scholarship of scholarships) {
            try {
                const { data: detailPage } = await axios.get(scholarship.link, {
                    headers: { "Accept-Language": "en-US,en;q=0.9" }
                });
                const $detail = cheerio.load(detailPage);

                scholarship.location = $detail("#scholarship-details-basic-info section div div:nth-child(1) p.text-heading-6")
                    .text().trim() || "Not specified";

                scholarship.description = $detail("section:nth-of-type(3) div div:nth-of-type(2) div:nth-of-type(1) div div:nth-of-type(1) div div:nth-of-type(4) div:nth-of-type(1) p:nth-of-type(2)")
                    .text().trim() || "Not specified";

                let requirements = $detail("section:nth-of-type(3) div div:nth-of-type(2) div:nth-of-type(1) div div:nth-of-type(2) div p div:nth-of-type(6)")
                    .text().trim() || "Not specified";

                let nationalRequirement = $detail("section:nth-of-type(3) div div:nth-of-type(2) div:nth-of-type(1) div div:nth-of-type(2) div div:nth-of-type(3) div:nth-of-type(1) p:nth-of-type(2)")
                    .text().trim() || "Not specified";

                let fields = $detail("section:nth-of-type(3) div div:nth-of-type(2) div:nth-of-type(1) div div:nth-of-type(2) div div:nth-of-type(3) div:nth-of-type(2) p")
                    .map((i, el) => $(el).text().trim())
                    .get()
                    .filter(field => field !== "Môn học bạn đang đăng ký"); // Remove unwanted text

                if (fields.length === 0) {
                    fields = ["Not specified"];
                }

                // Translate all extracted fields
                scholarship.requirements = await translateToEnglish(requirements);
                scholarship.nationalRequirement = await translateToEnglish(nationalRequirement);
                const translatedFields = await Promise.all(fields.map(async (field) => await translateToEnglish(field)));
                scholarship.field = translatedFields.join("; \n");

                console.log(`Loaded details page: ${scholarship.link}`);
                console.log(`- Extracted Location: ${scholarship.location}`);
                console.log(`- Extracted Qualification: ${scholarship.qualification}`);
                console.log(`- Extracted Fields: ${scholarship.field}`);
                console.log(`- Extracted Requirements: ${scholarship.requirements}`);
                console.log(`- Extracted National Requirements: ${scholarship.nationalRequirement}`);

            } catch (error) {
                console.error(`Error fetching details for ${scholarship.link}:`, error);
            }
        }

        return res.status(200).json({
            success: true,
            data: scholarships
        });

    } catch (error) {
        console.error("Crawl Error:", error);
        return res.status(500).json({ success: false, message: "Failed to crawl data." });
    }
};

const translateToEnglish = async (text) => {
    try {
        const response = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=vi|en`);
        return response.data.responseData.translatedText;
    } catch (error) {
        console.error("Translation Error:", error);
        return text; // Fallback to original text if translation fails
    }
};

export const postCrawledOpportunities = async (req, res) => {
    try {
        const { opportunities, unit } = req.body;
        const userId = req.id;

        if (!opportunities || opportunities.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No opportunities provided!"
            });
        }

        if (!unit) {
            return res.status(400).json({
                success: false,
                message: "Unit is required!"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        // Insert all opportunities in bulk
        const createdOpportunities = await Opportunity.insertMany(
            opportunities.map(opportunity => ({
                title: opportunity.title,
                description: opportunity.description,
                requirements: [opportunity.requirements],
                nationalRequirement: opportunity.nationalRequirement,
                location: opportunity.location,
                type: opportunity.type,
                funding: opportunity.funding,
                field: opportunity.field,
                unit: unit,
                // unit: user.unit || null, // If the user is part of an institution
                created_by: userId,
                position: opportunity.position || 1 // Default position
            }))
        );

        return res.status(201).json({
            success: true,
            message: "Opportunities posted successfully!",
            data: createdOpportunities
        });

    } catch (error) {
        console.error("Error posting crawled data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to post opportunities."
        });
    }
};
