/**
 * Smart Farm Assistant - Agricultural Knowledge Base
 * Contains farming topics, keywords, and responses for the chatbot
 */

const farmingTopics = {
    vegetables: {
        keywords: ['tomato', 'carrot', 'lettuce', 'cucumber', 'pepper', 'potato', 'onion', 'garlic', 'broccoli', 'spinach', 'vegetable'],
        responses: {
            general: "Vegetables are essential crops that provide vital nutrients. Most vegetables prefer well-drained soil rich in organic matter with a pH between 6.0-7.0.",
            planting: "Most vegetables should be planted after the last frost date in your region. Space plants according to their mature size to ensure proper air circulation.",
            care: "Regular watering, weeding, and monitoring for pests are key to successful vegetable gardening. Most vegetables need 1-2 inches of water per week.",
            harvest: "Harvest vegetables at their peak ripeness for best flavor and nutrition. Morning harvesting is often best as vegetables are well-hydrated."
        },
        specific: {
            tomato: {
                planting: "Plant tomatoes deeply, burying 2/3 of the stem to develop strong roots. Space plants 24-36 inches apart in full sun.",
                care: "Provide support with stakes or cages. Water consistently at the base to prevent disease. Remove suckers for indeterminate varieties.",
                problems: "Common issues include blossom end rot (calcium deficiency), early blight, and tomato hornworms. Proper spacing and crop rotation help prevent disease."
            },
            carrot: {
                planting: "Sow carrot seeds directly in loose, stone-free soil about 1/4 inch deep. Thin seedlings to 2-3 inches apart.",
                care: "Keep soil consistently moist until germination. Cover shoulders with soil to prevent greening.",
                harvest: "Harvest when roots reach desired size, typically 60-80 days after planting. Loosen soil before pulling to prevent breakage."
            },
            lettuce: {
                planting: "Sow lettuce seeds 1/8 inch deep, 8-12 inches apart. Lettuce prefers cool weather and can be succession planted every 2-3 weeks.",
                care: "Keep soil consistently moist. Provide afternoon shade in hot weather to prevent bolting.",
                harvest: "Harvest outer leaves as needed or cut entire heads. Harvest in morning for crispest leaves."
            }
        }
    },
    fruits: {
        keywords: ['apple', 'strawberry', 'blueberry', 'raspberry', 'watermelon', 'grape', 'citrus', 'peach', 'fruit'],
        responses: {
            general: "Fruit crops require specific care but reward growers with delicious harvests. Most fruits need full sun and well-drained soil.",
            planting: "Most fruit trees and bushes should be planted in early spring or fall. Consider pollination requirements when planning your orchard.",
            care: "Regular pruning improves air circulation and fruit production. Mulching helps retain moisture and suppress weeds.",
            harvest: "Harvest timing varies by fruit type. Most tree fruits are ready when they separate easily from branches with a gentle twist."
        },
        specific: {
            apple: {
                planting: "Plant dormant trees in early spring or late fall. Most varieties need a pollination partner of a different compatible variety.",
                care: "Prune annually in late winter to maintain an open center. Thin fruit to improve size and prevent branch breakage.",
                problems: "Watch for apple maggot, codling moth, and fire blight. Proper sanitation helps prevent disease spread."
            },
            strawberry: {
                planting: "Plant strawberries in early spring with crown at soil level and roots spread out. Space 12-18 inches apart.",
                care: "Remove runners to focus energy on fruit production. Mulch with straw to keep berries clean and prevent rot.",
                harvest: "Harvest when fully red, typically 30 days after flowering. Pick every 2-3 days during peak season."
            }
        }
    },
    grains: {
        keywords: ['wheat', 'corn', 'rice', 'oats', 'barley', 'grain'],
        responses: {
            general: "Grain crops form the backbone of global agriculture. Different grains have specific climate and soil requirements.",
            planting: "Most grains are direct-seeded using specialized equipment. Proper seed depth and spacing are critical for good emergence.",
            care: "Adequate fertility and weed control are essential for grain production. Monitor for disease and pest pressure regularly.",
            harvest: "Timing harvest to optimal moisture content is crucial for storage. Most grains are harvested when fully mature and dry."
        },
        specific: {
            corn: {
                planting: "Plant corn after soil temperatures reach 60°F. Plant in blocks rather than rows for better pollination.",
                care: "Corn is a heavy nitrogen feeder. Side-dress when plants are knee-high. Ensure consistent moisture during tasseling and silking.",
                harvest: "Sweet corn is ready when kernels produce a milky substance when punctured. Field corn is harvested when kernels are hard."
            },
            wheat: {
                planting: "Plant winter wheat in fall, spring wheat in early spring. Seed depth should be 1-1.5 inches in most soils.",
                care: "Apply nitrogen at key growth stages. Control weeds early as wheat is not competitive until established.",
                harvest: "Harvest when grain moisture is 13-14% for storage. Test by crushing a kernel with your fingernail - it should be hard."
            }
        }
    },
    soil: {
        keywords: ['soil', 'compost', 'fertilizer', 'pH', 'nutrients', 'amendment', 'mulch', 'organic matter'],
        responses: {
            general: "Healthy soil is the foundation of successful farming. Ideal soil has good structure, organic matter, and balanced nutrients.",
            testing: "Regular soil testing is recommended every 2-3 years. Tests reveal pH, nutrient levels, and organic matter content.",
            improvement: "Add organic matter through compost, cover crops, and crop rotation. Address pH issues with lime (to raise) or sulfur (to lower).",
            management: "Minimize tillage to protect soil structure. Use cover crops to prevent erosion and add organic matter."
        },
        specific: {
            compost: {
                making: "Create compost with a mix of green (nitrogen-rich) and brown (carbon-rich) materials. Maintain moisture like a wrung-out sponge.",
                using: "Apply 1-3 inches of compost annually to garden beds. For potted plants, use 20-30% compost in potting mixes."
            },
            pH: {
                testing: "Test soil pH with a kit or through a lab. Most plants prefer a pH between 6.0-7.0, though some have specific requirements.",
                adjusting: "To raise pH, add limestone. To lower pH, add sulfur or aluminum sulfate. Make gradual adjustments over time."
            }
        }
    },
    pests: {
        keywords: ['pest', 'insect', 'disease', 'fungus', 'control', 'aphid', 'beetle', 'caterpillar', 'mildew'],
        responses: {
            general: "Integrated Pest Management (IPM) combines prevention, monitoring, and control strategies to manage pests with minimal environmental impact.",
            prevention: "Crop rotation, resistant varieties, and proper spacing help prevent pest problems. Healthy plants resist pests better.",
            identification: "Accurate pest identification is crucial for effective management. Look for specific damage patterns and signs.",
            organic: "Organic controls include beneficial insects, row covers, hand-picking, and approved organic sprays like neem oil or insecticidal soap."
        },
        specific: {
            aphids: {
                identification: "Small soft-bodied insects that cluster on new growth and undersides of leaves. May cause leaf curling and sticky honeydew.",
                control: "Spray with strong water stream, introduce ladybugs, or apply insecticidal soap. Control ants that farm aphids."
            },
            tomato_blight: {
                identification: "Early blight shows dark spots with concentric rings on lower leaves. Late blight causes dark greasy spots and white mold.",
                control: "Remove infected plants, avoid overhead watering, use copper fungicide early, and practice crop rotation."
            }
        }
    },
    irrigation: {
        keywords: ['water', 'irrigation', 'watering', 'drought', 'moisture', 'drip', 'sprinkler'],
        responses: {
            general: "Efficient irrigation maximizes water use while meeting plant needs. Different crops and growth stages have varying water requirements.",
            methods: "Common methods include drip, sprinkler, flood, and furrow irrigation. Drip is most water-efficient for many crops.",
            scheduling: "Water deeply and infrequently to encourage deep root growth. Morning watering reduces evaporation and disease risk.",
            conservation: "Mulching, selecting drought-tolerant varieties, and grouping plants with similar water needs help conserve water."
        },
        specific: {
            drip: {
                setup: "Place drip lines near plant roots. Use pressure regulators and filters for consistent performance.",
                benefits: "Reduces water use by 30-50%, decreases weed growth, and minimizes disease by keeping foliage dry."
            },
            signs: {
                overwatering: "Yellowing leaves, soft stems, fungal growth, and consistently wet soil indicate overwatering.",
                underwatering: "Wilting, brown leaf edges, slow growth, and dry soil indicate water stress."
            }
        }
    },
    organic: {
        keywords: ['organic', 'natural', 'chemical-free', 'sustainable', 'permaculture'],
        responses: {
            general: "Organic farming avoids synthetic fertilizers and pesticides, focusing on building soil health and ecological balance.",
            certification: "Organic certification requires following specific standards and practices, with a transition period from conventional methods.",
            benefits: "Organic practices can improve soil health, biodiversity, and potentially nutritional content while reducing chemical exposure.",
            challenges: "Organic farming may face higher labor costs, yield variability, and specific pest management challenges."
        },
        specific: {
            fertilizing: {
                methods: "Organic fertilizers include compost, manure, bone meal, fish emulsion, and cover crops. These release nutrients slowly.",
                application: "Apply organic matter in fall to allow decomposition. Use liquid fertilizers during growing season for quick nutrient boosts."
            },
            pest_control: {
                methods: "Use crop rotation, beneficial insects, physical barriers, trap crops, and approved organic sprays like neem oil.",
                products: "OMRI-listed products meet organic standards. Always verify products are approved for organic use."
            }
        }
    },
    urban: {
        keywords: ['urban', 'container', 'small space', 'patio', 'balcony', 'vertical', 'indoor'],
        responses: {
            general: "Urban gardening adapts farming techniques to limited spaces using containers, vertical systems, and intensive planting methods.",
            container: "Choose containers at least 12 inches deep with drainage holes. Use quality potting mix, not garden soil, for container growing.",
            vertical: "Vertical gardening maximizes space by growing upward. Trellises, wall planters, and stackable systems increase growing area.",
            planning: "Focus on high-value crops that produce well in small spaces. Consider sunlight, water access, and weight restrictions."
        },
        specific: {
            crops: {
                recommended: "Good urban garden crops include lettuce, herbs, tomatoes, peppers, radishes, and many leafy greens.",
                avoid: "Large sprawling plants like pumpkins or full-size fruit trees are challenging in small spaces unless dwarf varieties are used."
            },
            indoor: {
                lighting: "Most edible plants need 6+ hours of direct sunlight or supplemental grow lights. Position plants near south or west-facing windows.",
                herbs: "Basil, mint, chives, and parsley grow well indoors with adequate light. Rotate plants regularly for even growth."
            }
        }
    },
    seasonal: {
        keywords: ['season', 'spring', 'summer', 'fall', 'autumn', 'winter', 'calendar', 'schedule', 'timing'],
        responses: {
            general: "Successful farming follows seasonal rhythms. Understanding your local growing season and frost dates is essential for timing planting and harvests.",
            planning: "Create a planting calendar based on your last and first frost dates. Succession planting extends harvests throughout the season.",
            extension: "Season extension techniques include row covers, cold frames, hoop houses, and selecting cold-hardy varieties."
        },
        specific: {
            spring: {
                tasks: "Prepare beds, start seeds, plant cool-season crops, prune perennials, and establish supports for climbing plants.",
                planting: "Plant peas, lettuce, radishes, and other cool-season crops when soil can be worked. Plant warm-season crops after frost danger passes."
            },
            summer: {
                tasks: "Regular harvesting, watering, weeding, and pest monitoring are key summer tasks. Provide shade for heat-sensitive crops.",
                planting: "Plant heat-loving crops like tomatoes, peppers, eggplant, and melons. Start fall crops in late summer."
            },
            fall: {
                tasks: "Harvest storage crops, plant garlic and cover crops, clean up diseased plant material, and prepare for winter.",
                planting: "Plant cool-season crops like spinach, kale, and carrots for fall harvest. Plant spring-flowering bulbs and garlic."
            },
            winter: {
                tasks: "Plan next season's garden, order seeds, maintain tools, and monitor stored harvests. Protect perennials in cold regions.",
                growing: "In mild climates, grow cold-hardy crops like kale and Brussels sprouts. Use season extension for winter harvests."
            }
        }
    },
    climate: {
        keywords: ['climate', 'zone', 'hardiness', 'microclimate', 'frost', 'temperature', 'weather'],
        responses: {
            general: "Climate determines what and when you can grow. Key factors include temperature extremes, frost dates, precipitation, and growing season length.",
            zones: "USDA Hardiness Zones are based on minimum winter temperatures. Planting recommendations often reference these zones.",
            microclimates: "Local conditions like buildings, slopes, and water bodies create microclimates that may differ from regional conditions.",
            adaptation: "Select crops and varieties suited to your climate. Consider heat tolerance, cold hardiness, and days to maturity."
        },
        specific: {
            temperate: {
                characteristics: "Four distinct seasons with moderate temperatures. Growing season typically 5-8 months.",
                strategies: "Use succession planting and season extension. Select varieties with appropriate days to maturity."
            },
            tropical: {
                characteristics: "Warm temperatures year-round with wet and dry seasons rather than temperature-based seasons.",
                strategies: "Focus on heat-tolerant varieties and moisture management. Plan around rainy and dry seasons."
            },
            arid: {
                characteristics: "Low rainfall, high evaporation, and often extreme temperature fluctuations between day and night.",
                strategies: "Emphasize water conservation, drought-tolerant varieties, and shade provision. Build soil organic matter to improve water retention."
            },
            continental: {
                characteristics: "Hot summers, cold winters, and moderate precipitation. Large seasonal temperature variations.",
                strategies: "Select cold-hardy perennials. Use season extension in spring and fall. Protect plants from temperature extremes."
            }
        }
    }
};

// Helper functions for the chatbot
const knowledgeBase = {
    // Find relevant topics based on user query
    findRelevantTopics: function(query) {
        const lowerQuery = query.toLowerCase();
        let relevantTopics = [];
        
        // Check each topic for keyword matches
        for (const [topic, data] of Object.entries(farmingTopics)) {
            for (const keyword of data.keywords) {
                if (lowerQuery.includes(keyword)) {
                    relevantTopics.push({
                        topic: topic,
                        keyword: keyword,
                        data: data
                    });
                    break; // Found a match in this topic
                }
            }
        }
        
        return relevantTopics;
    },
    
    // Generate a response based on the query and relevant topics
    generateResponse: function(query) {
        const lowerQuery = query.toLowerCase();
        const relevantTopics = this.findRelevantTopics(query);
        
        if (relevantTopics.length === 0) {
            return this.getFallbackResponse(query);
        }
        
        // Determine the most specific response possible
        let response = "";
        const topic = relevantTopics[0];
        
        // Check if query is about a specific plant/item
        for (const specificKey in topic.data.specific) {
            if (lowerQuery.includes(specificKey)) {
                const specificData = topic.data.specific[specificKey];
                
                // Check for specific aspects (planting, care, etc.)
                for (const aspect in specificData) {
                    if (lowerQuery.includes(aspect)) {
                        return specificData[aspect];
                    }
                }
                
                // If no specific aspect found, combine all information
                return Object.values(specificData).join(" ");
            }
        }
        
        // Check for general aspects (planting, care, etc.)
        for (const aspect in topic.data.responses) {
            if (lowerQuery.includes(aspect)) {
                return topic.data.responses[aspect];
            }
        }
        
        // If no specific aspect found, return general information
        return topic.data.responses.general;
    },
    
    // Get follow-up suggestions based on the current query and response
    getFollowUpSuggestions: function(query) {
        const relevantTopics = this.findRelevantTopics(query);
        
        if (relevantTopics.length === 0) {
            return [
                "Tell me about vegetable gardening",
                "How do I improve my soil?",
                "What are organic pest control methods?"
            ];
        }
        
        const topic = relevantTopics[0].topic;
        
        // Return topic-specific follow-ups
        switch(topic) {
            case 'vegetables':
                return [
                    "When should I plant tomatoes?",
                    "How do I control vegetable pests organically?",
                    "What vegetables grow well in containers?"
                ];
            case 'fruits':
                return [
                    "How do I prune fruit trees?",
                    "What fruits are easiest for beginners?",
                    "How do I prevent fruit tree diseases?"
                ];
            case 'soil':
                return [
                    "How do I make good compost?",
                    "What's the ideal soil pH for vegetables?",
                    "How can I improve clay soil?"
                ];
            case 'pests':
                return [
                    "How do I control aphids naturally?",
                    "What are signs of tomato blight?",
                    "How can I attract beneficial insects?"
                ];
            case 'irrigation':
                return [
                    "How often should I water my garden?",
                    "What's the best time of day to water plants?",
                    "How do I set up a drip irrigation system?"
                ];
            case 'organic':
                return [
                    "What are the best organic fertilizers?",
                    "How do I transition to organic gardening?",
                    "What organic methods control fungal diseases?"
                ];
            case 'urban':
                return [
                    "What vegetables grow best in containers?",
                    "How do I create a vertical garden?",
                    "What herbs grow well indoors?"
                ];
            case 'seasonal':
                return [
                    "What should I plant this season?",
                    "How do I extend my growing season?",
                    "When should I harvest my crops?"
                ];
            default:
                return [
                    "Tell me about vegetable gardening",
                    "How do I improve my soil?",
                    "What are organic pest control methods?"
                ];
        }
    },
    
    // Get a fallback response when no relevant topics are found
    getFallbackResponse: function(query) {
        const fallbacks = [
            "I don't have specific information about that yet. Would you like to know about vegetable gardening, soil health, or pest management instead?",
            "I'm not sure about that topic. I can help with questions about crops, soil, irrigation, pests, or seasonal planning. What would you like to know?",
            "I don't have that information in my knowledge base yet. I'm best at answering questions about common crops, organic methods, and basic farming practices."
        ];
        
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    },
    
    // Get seasonal recommendations based on user's location and current season
    getSeasonalRecommendations: function(region, season) {
        const recommendations = {
            temperate: {
                spring: "For temperate regions in spring, focus on cool-season crops like peas, lettuce, and radishes. Prepare beds for warm-season crops.",
                summer: "Summer in temperate regions is ideal for tomatoes, peppers, cucumbers, and beans. Monitor for pests and maintain consistent watering.",
                fall: "Fall is perfect for cool-season crops like kale, spinach, and root vegetables. Plant garlic and cover crops for next season.",
                winter: "In winter, focus on planning, tool maintenance, and growing cold-hardy crops like kale and Brussels sprouts with protection."
            },
            tropical: {
                spring: "In tropical regions, the dry season is good for crops that need less water. Plant heat-tolerant varieties of tomatoes, peppers, and tropical fruits.",
                summer: "During the rainy season, focus on good drainage and raised beds. Plant crops that tolerate high humidity and rainfall.",
                fall: "This is a good time for many vegetables as temperatures may be moderating. Continue succession planting of heat-tolerant varieties.",
                winter: "The dry season is ideal for many crops with irrigation. Focus on sun protection and water conservation techniques."
            },
            arid: {
                spring: "In arid regions, spring is ideal for quick-growing crops before intense heat. Use mulch and shade cloth to conserve moisture.",
                summer: "Focus on heat and drought-tolerant crops like okra, melons, and desert-adapted varieties. Provide afternoon shade when possible.",
                fall: "Fall brings cooler temperatures ideal for many crops. This is often the best growing season in arid regions.",
                winter: "Mild winters allow growing cool-season crops. Use row covers for occasional frost protection."
            },
            continental: {
                spring: "In continental regions, be prepared for temperature fluctuations. Use row covers and cold frames to protect early plantings.",
                summer: "Take advantage of the warm season for heat-loving crops. Succession plant for continuous harvests.",
                fall: "Plant cool-season crops for fall harvest. Prepare perennials for the cold winter ahead.",
                winter: "Focus on indoor seed starting, planning, and season extension techniques for cold-hardy crops."
            },
            polar: {
                spring: "In cold regions, spring comes late. Start seeds indoors and use season extension techniques like cold frames and row covers.",
                summer: "Make the most of the short growing season with quick-maturing crops. Use continuous harvesting techniques.",
                fall: "Early frosts are common. Focus on cold-hardy crops and harvest before hard freezes.",
                winter: "Indoor growing, microgreens, and planning for next season are key winter activities."
            }
        };
        
        // Default to temperate if region not specified
        const regionData = recommendations[region] || recommendations.temperate;
        return regionData[season] || "I don't have specific recommendations for this season in your region.";
    }
};