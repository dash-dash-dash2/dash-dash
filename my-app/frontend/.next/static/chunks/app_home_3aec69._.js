(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_home_3aec69._.js", {

"[project]/app/home/Navbar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Navbar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
function Navbar() {
    _s();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleSearch = (e)=>{
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?query=${search}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "e4adc2e6571b521e",
                children: "nav.bg-white.shadow-md.py-4.px-6.flex.justify-between.items-center.jsx-e4adc2e6571b521e{background-color:#fff;justify-content:space-between;align-items:center;margin-bottom:2rem;padding:1rem 2rem;display:flex;box-shadow:0 2px 4px #0000001a}a.text-2xl.font-bold.text-red-500.jsx-e4adc2e6571b521e{color:#ef4444;font-size:1.5rem;font-weight:700;text-decoration:none}form.relative.w-1\\/3.hidden.md\\:block.jsx-e4adc2e6571b521e{width:400px;position:relative}input.w-full.px-4.py-2.border.rounded-full.focus\\:outline-none.focus\\:ring-2.focus\\:ring-red-400.jsx-e4adc2e6571b521e{background-color:#fff;border:1px solid #e5e7eb;border-radius:9999px;outline:none;width:100%;padding:.5rem 1rem .5rem 2.5rem;font-size:.875rem}button.absolute.right-3.top-1\\/2.transform.-translate-y-1\\/2.jsx-e4adc2e6571b521e{cursor:pointer;background:0 0;border:none;position:absolute;top:50%;right:12px;transform:translateY(-50%)}a.flex.items-center.bg-red-500.text-white.px-4.py-2.rounded-full.hover\\:bg-red-600.transition.jsx-e4adc2e6571b521e{color:#fff;background-color:#ef4444;border-radius:9999px;align-items:center;padding:.5rem 1rem;text-decoration:none;transition:background-color .2s;display:flex}a.flex.items-center.bg-red-500.text-white.px-4.py-2.rounded-full.hover\\:bg-red-600.transition.jsx-e4adc2e6571b521e:hover{background-color:#dc2626}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "jsx-e4adc2e6571b521e" + " " + "bg-white shadow-md py-4 px-6 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        className: "jsx-e4adc2e6571b521e" + " " + "text-2xl font-bold text-red-500",
                        children: "🍔 FoodZone"
                    }, void 0, false, {
                        fileName: "[project]/app/home/Navbar.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSearch,
                        className: "jsx-e4adc2e6571b521e" + " " + "relative w-1/3 hidden md:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search food...",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                className: "jsx-e4adc2e6571b521e" + " " + "w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
                            }, void 0, false, {
                                fileName: "[project]/app/home/Navbar.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "jsx-e4adc2e6571b521e" + " " + "absolute right-3 top-1/2 transform -translate-y-1/2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "text-gray-500 w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Navbar.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/home/Navbar.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/Navbar.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/login",
                        className: "jsx-e4adc2e6571b521e" + " " + "flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                className: "w-5 h-5 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/app/home/Navbar.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            "Connect"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/Navbar.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/Navbar.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navbar, "N9tP0MPL4qItVfAzW5Hg4coRsTs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Navbar;
var _c;
__turbopack_refresh__.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/home/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/home/Navbar.tsx [app-client] (ecmascript)");
"use client";
;
;
// MenuCard Component
const MenuCard = ({ name, description, price, imageUrl })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer"
        },
        onMouseEnter: (e)=>{
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
        },
        onMouseLeave: (e)=>{
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: imageUrl,
                alt: name,
                style: {
                    width: "100%",
                    height: "160px",
                    objectFit: "cover"
                }
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginBottom: "8px"
                        },
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "14px",
                            color: "#666666",
                            marginBottom: "12px"
                        },
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#FFB800"
                        },
                        children: [
                            "$",
                            price.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
};
_c = MenuCard;
// Restaurant Component
const Restaurant = ()=>{
    const menuItems = [
        {
            name: "Cheeseburger",
            description: "Juicy beef patty with melted cheese, lettuce, and tomato.",
            price: 9.99,
            imageUrl: "https://via.placeholder.com/250x160",
            category: "Main Courses"
        },
        {
            name: "Margherita Pizza",
            description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
            price: 12.99,
            imageUrl: "https://via.placeholder.com/250x160",
            category: "Main Courses"
        },
        {
            name: "Caesar Salad",
            description: "Crisp romaine lettuce with Caesar dressing and croutons.",
            price: 7.99,
            imageUrl: "https://via.placeholder.com/250x160",
            category: "Starters"
        },
        {
            name: "Tiramisu",
            description: "Rich coffee-flavored dessert with layers of mascarpone cream.",
            price: 6.99,
            imageUrl: "https://via.placeholder.com/250x160",
            category: "Desserts"
        }
    ];
    // Group menu items by category
    const groupedMenuItems = menuItems.reduce((acc, item)=>{
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "24px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            Object.entries(groupedMenuItems).map(([category, items])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: "24px",
                                fontWeight: "bold",
                                marginBottom: "16px"
                            },
                            children: category
                        }, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                gap: "24px"
                            },
                            children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuCard, {
                                    ...item
                                }, index, false, {
                                    fileName: "[project]/app/home/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, category, true, {
                    fileName: "[project]/app/home/page.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/page.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
};
_c1 = Restaurant;
const __TURBOPACK__default__export__ = Restaurant;
var _c, _c1;
__turbopack_refresh__.register(_c, "MenuCard");
__turbopack_refresh__.register(_c1, "Restaurant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
 // "use client";
 // import React, { useEffect, useState } from "react";
 // import axios from "axios";
 // import Navbar from "./Navbar";
 // // Updated MenuItem Interface with Category
 // interface MenuItem {
 //   name: string;
 //   description: string;
 //   price: number;
 //   imageUrl: string;
 //   category: string; // New field for categorizing menu items
 // }
 // // MenuCard Component
 // const MenuCard: React.FC<MenuItem> = ({ name, description, price, imageUrl }) => {
 //   return (
 //     <div
 //       style={{
 //         borderRadius: "12px",
 //         backgroundColor: "#ffffff",
 //         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
 //         overflow: "hidden",
 //         transition: "transform 0.2s, box-shadow 0.2s",
 //         cursor: "pointer",
 //       }}
 //       onMouseEnter={(e) => {
 //         e.currentTarget.style.transform = "translateY(-4px)";
 //         e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
 //       }}
 //       onMouseLeave={(e) => {
 //         e.currentTarget.style.transform = "none";
 //         e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
 //       }}
 //     >
 //       <img src={imageUrl} alt={name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
 //       <div style={{ padding: "16px" }}>
 //         <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{name}</h3>
 //         <p style={{ fontSize: "14px", color: "#666666", marginBottom: "12px" }}>{description}</p>
 //         <p style={{ fontSize: "16px", fontWeight: "bold", color: "#FFB800" }}>${price.toFixed(2)}</p>
 //       </div>
 //     </div>
 //   );
 // };
 // // Restaurant Component
 // const Restaurant: React.FC = () => {
 //   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
 //   const [loading, setLoading] = useState<boolean>(true);
 //   const [error, setError] = useState<string | null>(null);
 //   useEffect(() => {
 //     const fetchMenuItems = async () => {
 //       try {
 //         const response = await axios.get("https://your-api-endpoint.com/menu-items");
 //         setMenuItems(response.data);
 //         setLoading(false);
 //       } catch (err) {
 //         setError("Failed to fetch menu items");
 //         setLoading(false);
 //       }
 //     };
 //     fetchMenuItems();
 //   }, []);
 //   if (loading) {
 //     return <div>Loading...</div>;
 //   }
 //   if (error) {
 //     return <div>{error}</div>;
 //   }
 //   // Group menu items by category
 //   const groupedMenuItems = menuItems.reduce((acc, item) => {
 //     if (!acc[item.category]) {
 //       acc[item.category] = [];
 //     }
 //     acc[item.category].push(item);
 //     return acc;
 //   }, {} as Record<string, MenuItem[]>);
 //   return (
 //     <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
 //       <Navbar />
 //       {Object.entries(groupedMenuItems).map(([category, items]) => (
 //         <div key={category}>
 //           <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>{category}</h2>
 //           <div
 //             style={{
 //               display: "grid",
 //               gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
 //               gap: "24px",
 //             }}
 //           >
 //             {items.map((item, index) => (
 //               <MenuCard key={index} {...item} />
 //             ))}
 //           </div>
 //         </div>
 //       ))}
 //     </div>
 //   );
 // };
 // export default Restaurant;
}}),
}]);

//# sourceMappingURL=app_home_3aec69._.js.map