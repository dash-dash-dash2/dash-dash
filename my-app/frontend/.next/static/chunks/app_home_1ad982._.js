(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_home_1ad982._.js", {

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
"[project]/app/home/Sidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client"; // Mark this component as a Client Component
;
const Sidebar = ()=>{
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const sidebarStyle = {
        position: 'relative',
        height: '100vh',
        borderRight: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        transition: 'width 0.3s',
        width: expanded ? '240px' : '70px'
    };
    const toggleButtonStyle = {
        position: 'absolute',
        right: '-12px',
        top: '32px',
        zIndex: 10,
        height: '24px',
        width: '24px',
        borderRadius: '50%',
        border: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    };
    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '16px',
        overflow: 'hidden',
        justifyContent: expanded ? 'flex-start' : 'center'
    };
    const logoTextStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#000000'
    };
    const logoAccentStyle = {
        color: '#FFB800'
    };
    const menuItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '8px',
        backgroundColor: '#ffffff',
        color: '#000000',
        transition: 'background-color 0.2s'
    };
    const menuItemHoverStyle = {
        backgroundColor: '#f3f4f6'
    };
    const upgradeBannerStyle = {
        position: 'absolute',
        bottom: '32px',
        left: '16px',
        right: '16px',
        borderRadius: '12px',
        backgroundColor: '#FFB80010',
        padding: '16px'
    };
    const upgradeButtonStyle = {
        width: '100%',
        borderRadius: '8px',
        backgroundColor: '#FFB800',
        color: '#ffffff',
        padding: '8px',
        fontSize: '14px',
        fontWeight: '500',
        border: 'none',
        cursor: 'pointer'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: sidebarStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                style: toggleButtonStyle,
                onClick: ()=>setExpanded((curr)=>!curr),
                children: expanded ? '<' : '>'
            }, void 0, false, {
                fileName: "[project]/app/home/Sidebar.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: logoStyle,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: logoTextStyle,
                    children: [
                        "Go",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: logoAccentStyle,
                            children: "Meal"
                        }, void 0, false, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        expanded && '.'
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/home/Sidebar.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/home/Sidebar.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '16px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    style: {
                        listStyle: 'none',
                        padding: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: menuItemStyle,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "🏠"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 113,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: menuItemStyle,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "🛍️"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Food Order"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 117,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: menuItemStyle,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "❤️"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Favorite"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 121,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: menuItemStyle,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "💬"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Messages"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 125,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: menuItemStyle,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "📜"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Order History"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 129,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: menuItemStyle,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "🧾"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Bills"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 133,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: menuItemStyle,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "⚙️"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Setting"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/Sidebar.tsx",
                                    lineNumber: 137,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/Sidebar.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/home/Sidebar.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/home/Sidebar.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: upgradeBannerStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '8px'
                        },
                        children: "Upgrade your Account to Get Free Voucher"
                    }, void 0, false, {
                        fileName: "[project]/app/home/Sidebar.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: upgradeButtonStyle,
                        children: "Upgrade"
                    }, void 0, false, {
                        fileName: "[project]/app/home/Sidebar.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/Sidebar.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/Sidebar.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
};
_s(Sidebar, "NZEs4N34I2vU569ODzuIjdsqMlo=");
_c = Sidebar;
const __TURBOPACK__default__export__ = Sidebar;
var _c;
__turbopack_refresh__.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/home/category.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client"; // Mark this component as a Client Component
;
const Category = ()=>{
    const categorySectionStyle = {
        marginBottom: '32px'
    };
    const categoryHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
    };
    const categoryTitleStyle = {
        fontSize: '20px',
        fontWeight: 'bold'
    };
    const viewAllLinkStyle = {
        color: '#FFB800',
        fontSize: '14px',
        textDecoration: 'none'
    };
    const categoryListStyle = {
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px'
    };
    const categoryItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        padding: '16px',
        transition: 'background-color 0.2s, color 0.2s',
        cursor: 'pointer'
    };
    const categoryItemHoverStyle = {
        backgroundColor: '#FFB800',
        color: '#ffffff'
    };
    const categoryIconStyle = {
        fontSize: '24px',
        marginBottom: '8px'
    };
    const categoryNameStyle = {
        fontSize: '14px'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: categorySectionStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: categoryHeaderStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: categoryTitleStyle,
                        children: "Category"
                    }, void 0, false, {
                        fileName: "[project]/app/home/category.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        style: viewAllLinkStyle,
                        children: "View all"
                    }, void 0, false, {
                        fileName: "[project]/app/home/category.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/category.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: categoryListStyle,
                children: [
                    {
                        id: 1,
                        name: 'Fast Food',
                        icon: '🍔'
                    },
                    {
                        id: 2,
                        name: 'Pizza',
                        icon: '🍕'
                    },
                    {
                        id: 3,
                        name: 'Sushi',
                        icon: '🍣'
                    },
                    {
                        id: 4,
                        name: 'Desserts',
                        icon: '🍩'
                    }
                ].map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: categoryItemStyle,
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.backgroundColor = '#FFB800';
                            e.currentTarget.style.color = '#ffffff';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.color = '#000000';
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: categoryIconStyle,
                                children: category.icon
                            }, void 0, false, {
                                fileName: "[project]/app/home/category.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: categoryNameStyle,
                                children: category.name
                            }, void 0, false, {
                                fileName: "[project]/app/home/category.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, category.id, true, {
                        fileName: "[project]/app/home/category.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/home/category.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/category.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
};
_c = Category;
const __TURBOPACK__default__export__ = Category;
var _c;
__turbopack_refresh__.register(_c, "Category");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/home/order.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client"; // Mark this component as a Client Component
;
const Order = ()=>{
    const orderContainerStyle = {
        padding: '24px',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    };
    const orderHeaderStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '24px',
        color: '#1f2937'
    };
    const orderListStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    };
    const orderItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };
    const orderDetailsStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };
    const orderIdStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937'
    };
    const orderItemsStyle = {
        fontSize: '14px',
        color: '#6b7280'
    };
    const orderTotalStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1f2937'
    };
    const orderStatusStyle = {
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        textTransform: 'uppercase'
    };
    const viewDetailsButtonStyle = {
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: '#FFB800',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    };
    // Sample order data
    const orders = [
        {
            id: '#12345',
            items: [
                'Cheeseburger',
                'Fries',
                'Coke'
            ],
            total: 19.99,
            status: 'Delivered',
            statusColor: '#10b981'
        },
        {
            id: '#12346',
            items: [
                'Margherita Pizza',
                'Garlic Bread'
            ],
            total: 24.99,
            status: 'Preparing',
            statusColor: '#f59e0b'
        },
        {
            id: '#12347',
            items: [
                'Sushi Platter',
                'Miso Soup'
            ],
            total: 32.99,
            status: 'Pending',
            statusColor: '#ef4444'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: orderContainerStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: orderHeaderStyle,
                children: "Your Orders"
            }, void 0, false, {
                fileName: "[project]/app/home/order.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: orderListStyle,
                children: orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: orderItemStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: orderDetailsStyle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: orderIdStyle,
                                        children: [
                                            "Order ",
                                            order.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/order.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: orderItemsStyle,
                                        children: order.items.join(', ')
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/order.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: orderTotalStyle,
                                        children: [
                                            "Total: $",
                                            order.total.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/order.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/order.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...orderStatusStyle,
                                            backgroundColor: order.statusColor,
                                            color: '#ffffff'
                                        },
                                        children: order.status
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/order.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: viewDetailsButtonStyle,
                                        children: "View Details"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/order.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/order.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        ]
                    }, order.id, true, {
                        fileName: "[project]/app/home/order.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/home/order.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/order.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
};
_c = Order;
const __TURBOPACK__default__export__ = Order;
var _c;
__turbopack_refresh__.register(_c, "Order");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/home/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/home/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$category$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/home/category.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$order$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/home/order.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const ingredientsList = [
    "Cheese",
    "Tomatoes",
    "Lettuce",
    "Onions",
    "Bacon",
    "Mushrooms"
];
const MenuCard = ({ name, description, price, imageUrl, onClick })=>{
    const cardStyle = {
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer"
    };
    const imageStyle = {
        width: "100%",
        height: "160px",
        objectFit: "cover"
    };
    const contentStyle = {
        padding: "16px"
    };
    const titleStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "8px"
    };
    const descriptionStyle = {
        fontSize: "14px",
        color: "#666666",
        marginBottom: "12px"
    };
    const priceStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#FFB800"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: cardStyle,
        onMouseEnter: (e)=>{
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
        },
        onMouseLeave: (e)=>{
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        },
        onClick: ()=>onClick({
                name,
                description,
                price,
                imageUrl
            }),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: imageUrl,
                alt: name,
                style: imageStyle
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: contentStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: titleStyle,
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: descriptionStyle,
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: priceStyle,
                        children: [
                            "$",
                            price.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/page.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
};
_c = MenuCard;
const Restaurant = ()=>{
    _s();
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedIngredients, setSelectedIngredients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleIngredientChange = (ingredient)=>{
        setSelectedIngredients((prev)=>prev.includes(ingredient) ? prev.filter((item)=>item !== ingredient) : [
                ...prev,
                ingredient
            ]);
    };
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px"
    };
    const mainContentStyle = {
        display: "flex",
        gap: "24px"
    };
    const menuGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "24px"
    };
    const orderPanelStyle = {
        width: "300px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    };
    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };
    const modalContentStyle = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "400px"
    };
    const modalButtonStyle = {
        padding: "8px 12px",
        cursor: "pointer"
    };
    const modalAddButtonStyle = {
        ...modalButtonStyle,
        backgroundColor: "#FFB800",
        color: "white"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: containerStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: mainContentStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$category$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: menuGridStyle,
                                children: [
                                    {
                                        name: "Cheeseburger",
                                        description: "Juicy beef patty with melted cheese, lettuce, and tomato.",
                                        price: 9.99,
                                        imageUrl: "https://via.placeholder.com/250x160"
                                    },
                                    {
                                        name: "Margherita Pizza",
                                        description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
                                        price: 12.99,
                                        imageUrl: "https://via.placeholder.com/250x160"
                                    }
                                ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuCard, {
                                        ...item,
                                        onClick: setSelectedItem
                                    }, index, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: orderPanelStyle,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$order$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            selectedItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: modalOverlayStyle,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: modalContentStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: selectedItem.name
                        }, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selectedItem.imageUrl,
                            alt: selectedItem.name,
                            style: {
                                width: "100%",
                                borderRadius: "8px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 178,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: selectedItem.description
                        }, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "18px",
                                fontWeight: "bold"
                            },
                            children: [
                                "$",
                                selectedItem.price.toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: "Choose Ingredients:"
                        }, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: ingredientsList.map((ingredient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: "block",
                                        marginBottom: "8px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: selectedIngredients.includes(ingredient),
                                            onChange: ()=>handleIngredientChange(ingredient)
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 19
                                        }, this),
                                        ingredient
                                    ]
                                }, ingredient, true, {
                                    fileName: "[project]/app/home/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: "16px",
                                display: "flex",
                                justifyContent: "space-between"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedItem(null),
                                    style: modalButtonStyle,
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    style: modalAddButtonStyle,
                                    children: "Add to Order"
                                }, void 0, false, {
                                    fileName: "[project]/app/home/page.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/home/page.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/home/page.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/page.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
};
_s(Restaurant, "xu9D59iBQa24oMObIuGFmDBCd5g=");
_c1 = Restaurant;
const __TURBOPACK__default__export__ = Restaurant;
var _c, _c1;
__turbopack_refresh__.register(_c, "MenuCard");
__turbopack_refresh__.register(_c1, "Restaurant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_home_1ad982._.js.map