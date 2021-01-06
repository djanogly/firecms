import React from "react";
import { firebaseConfig } from "./firebase_config";
import {
    AdditionalColumnDelegate,
    AdditionalView,
    AsyncPreviewComponent,
    Authenticator,
    buildCollection,
    buildSchema,
    CMSApp,
    Entity,
    EntityCollectionView,
    EntitySaveProps,
    EnumValues
} from "@camberi/firecms";
import PriceTextPreview from "./custom_preview/PriceTextPreview";
import CustomColorTextField from "./custom_field/CustomColorTextField";
import CustomBooleanPreview from "./custom_preview/CustomBooleanPreview";
import {
    // blogSearchDelegate,
    partnersSearchDelegate,
    usersSearchDelegate
} from "./algolia_utils";
import firebase from "firebase";
import { IconButton, Tooltip } from "@material-ui/core";
// import GitHubIcon from "@material-ui/icons/GitHub";
import { ExampleAdditionalView } from "./ExampleAdditionalView";
import logo from "./images/coffy_logo.png";


function App() {

    

    const partnerSchema = buildSchema({
        name: "Partner",
        properties: {
            basicInfo: {
                title: "Info",
                dataType: "map",
                disabled: true,
                columnWidth:150,
                properties: {
                    restaurantName: {
                        disabled:true,
                        title: "Name",
                        dataType: "string"
                    },
                }
            },
            approved: {
                dataType: "boolean",
                title: "Approved?",
                disabled:true
            },
            covidOpen: {
                dataType: "boolean",
                title: "Available Now?",
            },
            description: {
                title: "Description",
                dataType: "string",
                config:{multiline:true}
            },
            // restaurantName: {
            //     dataType: "string",   
            //     title: "Name",
            // },
            amenities: {
                title: "Amenities",
                dataType: "map",
                properties: {
                    altMilks: {
                        title: "Alt Milks",
                        dataType: "array",
                        of: {
                            dataType: "string",
                            }
                    },
                    beans:{
                        title: "Beans used",
                        dataType: "string"
                    },
                    coffeeMachineModel:{
                        title: "Coffee Machine",
                        dataType: "string"
                    },
                    grinder:{
                        title: "Grinder",
                        dataType: "string"
                    },
                    location:{
                        title: "Location",
                        dataType: "string"
                    },
                    storeName:{
                        title: "Store Name",
                        dataType: "string"
                    },
                    storeType:{
                        title: "Store Type",
                        dataType: "string"
                    },
                    beansForSale: {
                        dataType: "boolean",
                        title: "Beans for Sale?",
                    },
                    outdoorSeating: {
                        dataType: "boolean",
                        title: "Outdoor Seating?",
                    },
                    tableSeating: {
                        dataType: "boolean",
                        title: "Table Seating?",
                    },
                    petsWelcome: {
                        dataType: "boolean",
                        title: "Pets Welcome?",
                    },
                    toilets: {
                        dataType: "boolean",
                        title: "Toilets?",
                    },
                    wifi: {
                        dataType: "boolean",
                        title: "Wi-Fi?",
                    },
                },
            },
            imgs: {
                dataType: "array",
                title: "Images",
                validation: {
                    // required: true,
                    // min:1
                },
                description: "This fields allows uploading multiple images at once",
                of: {
                    dataType: "string",
                    config: {
                        fieldProps:{
                            
                        },
                        storageMeta: {
                            mediaType: "image",
                            // TODO : fix image location by linking to name or id
                            storagePath: "imgs/_unsorted/",
                            acceptedFiles: ["image/*"],
                            storeUrl:true,

                            // metadata: {
                            //     cacheControl: "max-age=1000000"
                            // }
                        }
                    }
                },
            },
            billboard: {
                title: "Billboard",
                dataType: "array",
                of: {
                    dataType: "string",
                    }
            },
            included: {
                title: "Drinks Included",
                dataType: "array",
                of: {
                    dataType: "string",
                    }
            },
            location: {
                title: "Location",
                description: "Lat & Long must ALWAYS be set. Either fullAddress or the broken-down address should be filled.",
                dataType: "map",
                validation: {
                    required:true,
                },
                properties: {
                    latitude: {
                        title: "Latitude",
                        dataType: "number",
                        validation: {
                            required:true,
                        }
                    },
                    longitude: {
                        title: "Longitude",
                        dataType: "number",
                        validation: {
                            required:true,
                        }
                    },
                    fullAddress:{
                        title: "Full Address",
                        dataType: "string",
                    },
                    addressLine1:{
                        title: "Address Line 1",
                        dataType: "string",
                    },
                    addressLine2:{
                        title: "Address Line 2",
                        dataType: "string",
                    },
                    city:{
                        title: "City",
                        dataType: "string",
                    },
                    postcode:{
                        title: "Postcode",
                        dataType: "string",
                    },
                    country:{
                        title: "Country",
                        dataType: "string",
                    },
                }
            },
            openingHours: {
                title: "Opening Hours",
                dataType: "map",
                validation:{required:true},
                properties: {
                    monday: {
                        title: "Monday",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties:{
                                start:{
                                    title: "Start Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                                end:{
                                    title: "End Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                            }
                            }
                    },
                    tuesday: {
                        title: "Tuesday",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties:{
                                start:{
                                    title: "Start Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                                end:{
                                    title: "End Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                            }
                            }
                    },
                    wednesday: {
                        title: "Wednesday",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties:{
                                start:{
                                    title: "Start Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                                end:{
                                    title: "End Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                            }
                            }
                    },
                    thursday: {
                        title: "Thursday",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties:{
                                start:{
                                    title: "Start Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                                end:{
                                    title: "End Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                            }
                            }
                    },
                    friday: {
                        title: "Friday",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties:{
                                start:{
                                    title: "Start Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                                end:{
                                    title: "End Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                            }
                            }
                    },
                    saturday: {
                        title: "Saturday",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties:{
                                start:{
                                    title: "Start Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                                end:{
                                    title: "End Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                            }
                            }
                    },
                    sunday: {
                        title: "Sunday",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties:{
                                start:{
                                    title: "Start Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                                end:{
                                    title: "End Time",
                                    dataType: "string",
                                    validation:{
                                        required: true,
                                        matches:  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    }
                                },
                            }
                            }
                    },
                },
            },
            // restaurantName:{
            //     dataType: "string",
            //     title: "Restaurant Name",
            // }
            // approved: {
            //     dataType: "boolean",
            //     title: "Approved",
            //     columnWidth: 100,
            //     validation: {
                    
            //     }
            // },
            // category: {
            //     dataType: "string",
            //     title: "Category",
            //     config: {
            //         enumValues: categories
            //     }
            // },
        //     price: {
        //         dataType: "number",
        //         title: "Price",
        //         validation: {
        //             requiredMessage: "You must set a price between 0 and 1000",
        //             min: 0,
        //             max: 1000
        //         },
        //         config: {
        //             customPreview: PriceTextPreview
        //         },
        //         description: "Price with range validation"
        //     },

        //     currency: {
        //         dataType: "string",
        //         title: "Currency",
        //         config: {
        //             enumValues: {
        //                 EUR: "Euros",
        //                 DOL: "Dollars"
        //             }
        //         },
        //         validation: {
        //             required: true
        //         }
        //     },
        //     public: {
        //         dataType: "boolean",
        //         title: "Public",
        //         description: "Should this partner be visible in the website",
        //         longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros."
        //     },
        //     brand: {
        //         dataType: "string",
        //         title: "Brand",
        //         validation: {
        //             required: true
        //         }
        //     },
        //     amazon_link: {
        //         dataType: "string",
        //         title: "Amazon link",
        //         config: {
        //             url: true
        //         }
        //     },
        //     related_partners: {
        //         dataType: "array",
        //         title: "Related partners",
        //         description: "Reference to self",
        //         of: {
        //             dataType: "reference",
        //             collectionPath: "partners"
        //         }
        //     },
        //     publisher: {
        //         title: "Publisher",
        //         description: "This is an example of a map property",
        //         dataType: "map",
        //         properties: {
        //             name: {
        //                 title: "Name",
        //                 dataType: "string"
        //             },
        //             external_id: {
        //                 title: "External id",
        //                 dataType: "string"
        //             }
        //         }
        //     },
        //     min_known_price: {
        //         dataType: "number",
        //         title: "Min known price",
        //         disabled: true,
        //         description: "Minimum price this partner has ever had"
        //     },
        //     prime_eligible: {
        //         dataType: "boolean",
        //         title: "Prime eligible",
        //         disabled: true
        //     },
        //     uppercase_name: {
        //         title: "Uppercase Name",
        //         dataType: "string",
        //         disabled: true,
        //         description: "This field gets updated with a preSave hook"
        //     }

        // },
        // defaultValues: {
        //     currency: "EUR",
        //     publisher: {
        //         name: "Default publisher"
        //     }
        }
    });

    const couponSchema = buildSchema({
        name: "Coupon",
        properties: {
            timestamp: {
                title: "Redeemed at",
                dataType: "string",
                disabled:true,
            },
            name: {
                title: "Store",
                disabled:true,
                dataType: "string"
            },
            number: {
                title: "Number",
                dataType: "number"
            },
        }});

    const usersSchema = buildSchema({
        name: "User",
        properties: {
            firstName: {
                title: "First name",
                dataType: "string"
            },
            lastName: {
                title: "Last name",
                dataType: "string"
            },
            email: {
                disabled:true,
                title: "Email",
                dataType: "string",
                validation: {
                    email: true
                }
            },
            createdAt: {
                title: "Created At",
                disabled:true,
                dataType: "string"
            },
            
            couponCount: {
                title: "Coupon Count",
                dataType: "number",
                validation: {
                    min:0,
                    max:50,
                    integer:true
                }
            },
            trialCouponCount: {
                title: "Trial Coupon Count",
                dataType: "number",
                validation: {
                    min:0,
                    max:10,
                    integer:true
                }
            },
            trialEnds: {
                title: "Trial Ends (Unix Timestamp)",
                dataType: "number",
                // disabled:true,
                validation: {
                    min: 1600000000000,
                    integer:true
                }
            },
            subscription: {
                title: "Subscription",
                disabled:true,
                dataType: "map",
                properties: {
                    status: {
                        title: "Status",
                        dataType: "string",
                    },
                    nickname: {
                        title: "Plan",
                        dataType: "string",
                    },
                },
            },
            // picture: {
            //     title: "Picture",
            //     dataType: "map",
            //     properties: {
            //         large: {
            //             config: {
            //                 url: "image"
            //             },
            //             validation: {
            //                 url: true
            //             }
            //         },
            //         thumbnail: {
            //             title: "Thumbnail",
            //             dataType: "string",
            //             config: {
            //                 url: "image"
            //             },
            //             validation: {
            //                 url: true
            //             }
            //         }
            //     },
            //     previewProperties: ["large"]
            // }
        }
    });

    // const partnerAdditionalColumn: AdditionalColumnDelegate<typeof partnerSchema> = {
    //     id: "restaurantName",
    //     title: "Store Name",
    //     builder: (entity: Entity<typeof partnerSchema>) =>
    //     entity.values.basicInfo.restaurantName
    //         // <AsyncPreviewComponent builder={
    //         //     entity.reference.collection("locales")
    //         //         .doc("es")
    //         //         .get()
    //         //         .then((snapshot: any) => snapshot.get("name") as string)
    //         // }/>
    // };


    // partnerSchema.onPreSave = ({
    //                                schema,
    //                                collectionPath,
    //                                id,
    //                                values,
    //                                status
    //                            }: EntitySaveProps<typeof partnerSchema>) => {
    //     var arr=values.imgs;
    //     const partnerId =values.partnerId;
            
    //     var resultArr = arr.map(function(x:string){return x.replace(/partnerId/g, partnerId);});
    //     values.imgs = resultArr;
    //     //  = values.name.toUpperCase();
    //     // if (
    //     //     values.description != null || 
    //     //     values.description != ''
                
    //     //     )
    //     return values;
    // };

    partnerSchema.onSaveSuccess = (props) => {
        console.log("onSaveSuccess", props);
    };

    // partnerSchema.onDelete = (props) => {
    //     console.log("onDelete", props);
    // };



    const partnersCollection = buildCollection({
        relativePath: "partners",
        schema: partnerSchema,
        name: "partners",
        textSearchDelegate: partnersSearchDelegate,
        defaultSize:"s",
        // excludedProperties
        // additionalColumns: [partnerAdditionalColumn],
        // excludedProperties: ["images"],
        filterableProperties: ["approved", "covidOpen"],
        pagination:true,
        inlineEditing:false,
        deleteEnabled:false,
    });

    const usersCollection = buildCollection({
        relativePath: "users",
        schema: usersSchema,
        name: "Users",
        textSearchDelegate: usersSearchDelegate,
        defaultSize:"xs",
        pagination:true,
        inlineEditing:false,
        deleteEnabled:false,
        // deleteEnabled:
        filterableProperties:["email", "firstName", "lastName","couponCount", "trialEnds"],
        subcollections: [
            buildCollection({
                name: "Coupons",
                relativePath: "coupons",
                schema: couponSchema
            })
        ],
        properties: ["firstName", "lastName", "email", "couponCount", "trialCouponCount", ]
    });

    

    // const blogCollection = buildCollection({
    //     relativePath: "blog",
    //     schema: blogSchema,
    //     name: "Blog",
    //     group: "Content",
    //     textSearchDelegate: blogSearchDelegate,
    //     properties: ["name", "images", "status", "reviewed", "partners", "long_text"],
    //     filterableProperties: ["name", "status"],
    //     initialFilter: {
    //         "status": ["==", "published"]
    //     }
    // });

    const navigation: EntityCollectionView[] = [
        partnersCollection,
        usersCollection,
        // blogCollection
    ];

    // if (process.env.NODE_ENV !== "production") {
    //     navigation.push(buildCollection({
    //         relativePath: "test_entity",
    //         schema: testEntitySchema,
    //         group: "Test group",
    //         name: "Test entity",
    //         filterableProperties: ["difficulty", "search_adjacent", "description"],
    //         subcollections: [{
    //             relativePath: "test_subcollection",
    //             schema: testEntitySchema,
    //             name: "Test entity",
    //             filterableProperties: ["difficulty", "search_adjacent", "description"]
    //         }]
    //     }));
    // }

    const myAuthenticator: Authenticator = (user?: firebase.User) => {
         const docRef = firebase.firestore().collection("roles").doc(user?.uid);
        
        const bool = docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return true;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return false;
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            return false;
        });
        
        
        
        // if (user?.uid)
        
        
        // where('id',"==",user?.uid).where('role','==','admin').get;
        // console.log("Allowing access to", user?.email);
        return bool;
    };

    // const additionalViews: AdditionalView[] = [{
    //     path: "additional",
    //     name: "Additional",
    //     group: "Content",
    //     view: <ExampleAdditionalView/>
    // }];

    const onFirebaseInit = (config:Object) => {
        firebase.firestore().enablePersistence()
        .catch(function(err) {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
      
        // firebase.firestore().useEmulator("localhost", 8080);
    };

    return <CMSApp
        name={"Coffy Admin"}
        authentication={myAuthenticator}
        allowSkipLogin={false}
        logo={logo}
        navigation={navigation}
        // additionalViews={additionalViews}
        // In the partnerion environment, the configuration is fetched from the environment automatically
        firebaseConfig={firebaseConfig}
        onFirebaseInit={onFirebaseInit}
        primaryColor={"#e34819"}
        // firebaseConfig={process.env.NODE_ENV !== "partnerion" ? firebaseConfig : undefined}
        // toolbarExtraWidget={githubLink}
    />;
}

export default App;
