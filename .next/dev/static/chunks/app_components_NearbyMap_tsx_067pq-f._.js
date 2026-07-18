(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/NearbyMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NearbyMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$universities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/universities.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const uniIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
    className: "",
    html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:#ea4335;transform:rotate(-45deg);box-shadow:0 1px 4px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
    <div style="width:11px;height:11px;border-radius:50%;background:white;transform:rotate(45deg);"></div>
  </div>`,
    iconSize: [
        30,
        30
    ],
    iconAnchor: [
        15,
        30
    ],
    popupAnchor: [
        0,
        -30
    ]
});
const userIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
    className: "",
    html: `<div style="position:relative;width:20px;height:20px;">
    <div style="position:absolute;inset:-8px;border-radius:50%;background:rgba(66,133,244,0.25);"></div>
    <div style="width:20px;height:20px;border-radius:50%;background:#4285f4;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>
  </div>`,
    iconSize: [
        20,
        20
    ],
    iconAnchor: [
        10,
        10
    ]
});
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function Recenter({ position }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Recenter.useEffect": ()=>{
            map.flyTo(position, 12, {
                duration: 0.8
            });
        }
    }["Recenter.useEffect"], [
        position,
        map
    ]);
    return null;
}
_s(Recenter, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = Recenter;
function NearbyMap({ onClose }) {
    _s1();
    const [userPos, setUserPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [locError, setLocError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [flyTo, setFlyTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NearbyMap.useEffect": ()=>{
            if (!navigator.geolocation) {
                setLocError("Geolocation is not supported by your browser");
                return;
            }
            navigator.geolocation.getCurrentPosition({
                "NearbyMap.useEffect": (pos)=>setUserPos([
                        pos.coords.latitude,
                        pos.coords.longitude
                    ])
            }["NearbyMap.useEffect"], {
                "NearbyMap.useEffect": ()=>setLocError("Location access denied — showing all universities instead")
            }["NearbyMap.useEffect"], {
                enableHighAccuracy: true,
                timeout: 8000
            });
        }
    }["NearbyMap.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NearbyMap.useEffect": ()=>{
            document.body.style.overflow = "hidden";
            return ({
                "NearbyMap.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["NearbyMap.useEffect"];
        }
    }["NearbyMap.useEffect"], []);
    const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NearbyMap.useMemo[sorted]": ()=>{
            const q = query.trim().toLowerCase();
            const filtered = q ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$universities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["universities"].filter({
                "NearbyMap.useMemo[sorted]": (u)=>u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.country.toLowerCase().includes(q)
            }["NearbyMap.useMemo[sorted]"]) : __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$universities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["universities"];
            if (!userPos) return filtered.map({
                "NearbyMap.useMemo[sorted]": (u)=>({
                        u,
                        dist: null
                    })
            }["NearbyMap.useMemo[sorted]"]);
            return filtered.map({
                "NearbyMap.useMemo[sorted]": (u)=>({
                        u,
                        dist: haversine(userPos[0], userPos[1], u.lat, u.lng)
                    })
            }["NearbyMap.useMemo[sorted]"]).sort({
                "NearbyMap.useMemo[sorted]": (a, b)=>(a.dist ?? Infinity) - (b.dist ?? Infinity)
            }["NearbyMap.useMemo[sorted]"]);
        }
    }["NearbyMap.useMemo[sorted]"], [
        query,
        userPos
    ]);
    const center = userPos ?? [
        50.85,
        4.5
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "white",
            display: "flex"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 360,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid oklch(90% 0.01 245)",
                    boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
                    zIndex: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "16px 16px 12px",
                            display: "flex",
                            alignItems: "center",
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                "aria-label": "Close map",
                                style: {
                                    width: 40,
                                    height: 40,
                                    flexShrink: 0,
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "oklch(96% 0.01 245)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 18,
                                    color: "oklch(30% 0.02 245)",
                                    cursor: "pointer"
                                },
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NearbyMap.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    background: "white",
                                    border: "1px solid oklch(88% 0.01 245)",
                                    borderRadius: 24,
                                    padding: "10px 16px",
                                    boxShadow: "0 1px 6px rgba(0,0,0,0.12)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "oklch(55% 0.02 245)",
                                            fontSize: 15
                                        },
                                        children: "⌕"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NearbyMap.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        autoFocus: true,
                                        value: query,
                                        onChange: (e)=>setQuery(e.target.value),
                                        placeholder: "Search universities near you",
                                        style: {
                                            flex: 1,
                                            border: "none",
                                            outline: "none",
                                            fontFamily: "'DM Sans',sans-serif",
                                            fontSize: 14.5,
                                            background: "transparent",
                                            color: "oklch(18% 0.03 245)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NearbyMap.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/NearbyMap.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NearbyMap.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    locError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            margin: "0 16px 10px",
                            padding: "10px 12px",
                            background: "oklch(96% 0.05 60)",
                            color: "oklch(40% 0.1 60)",
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 12.5,
                            borderRadius: 8
                        },
                        children: locError
                    }, void 0, false, {
                        fileName: "[project]/app/components/NearbyMap.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            overflowY: "auto",
                            flex: 1,
                            padding: "0 8px 16px"
                        },
                        children: [
                            sorted.map(({ u, dist })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setSelected(u);
                                        setFlyTo([
                                            u.lat,
                                            u.lng
                                        ]);
                                    },
                                    style: {
                                        width: "100%",
                                        textAlign: "left",
                                        display: "flex",
                                        gap: 12,
                                        alignItems: "flex-start",
                                        padding: "12px 10px",
                                        borderRadius: 10,
                                        border: "none",
                                        background: selected?.name === u.name ? "oklch(95% 0.04 245)" : "transparent",
                                        cursor: "pointer",
                                        marginBottom: 2
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 34,
                                                height: 34,
                                                flexShrink: 0,
                                                borderRadius: "50% 50% 50% 0",
                                                background: "#ea4335",
                                                transform: "rotate(-45deg)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 2
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    transform: "rotate(45deg)",
                                                    color: "white",
                                                    fontSize: 13,
                                                    fontWeight: 700
                                                },
                                                children: "🎓"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NearbyMap.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NearbyMap.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: "'DM Sans',sans-serif",
                                                        fontSize: 14.5,
                                                        fontWeight: 600,
                                                        color: "oklch(18% 0.03 245)"
                                                    },
                                                    children: u.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/NearbyMap.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: "'DM Sans',sans-serif",
                                                        fontSize: 12.5,
                                                        color: "oklch(52% 0.02 245)",
                                                        marginTop: 2
                                                    },
                                                    children: [
                                                        u.city,
                                                        ", ",
                                                        u.country,
                                                        dist !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "oklch(42% 0.14 245)",
                                                                fontWeight: 600
                                                            },
                                                            children: [
                                                                " ",
                                                                "· ",
                                                                dist < 10 ? dist.toFixed(1) : Math.round(dist),
                                                                " km"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/NearbyMap.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/NearbyMap.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/NearbyMap.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, u.name, true, {
                                    fileName: "[project]/app/components/NearbyMap.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)),
                            sorted.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "24px 12px",
                                    fontFamily: "'DM Sans',sans-serif",
                                    fontSize: 13.5,
                                    color: "oklch(55% 0.02 245)",
                                    textAlign: "center"
                                },
                                children: [
                                    "No universities match “",
                                    query,
                                    "”"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/NearbyMap.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NearbyMap.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NearbyMap.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    position: "relative"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
                    center: center,
                    zoom: userPos ? 12 : 8,
                    style: {
                        height: "100%",
                        width: "100%"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
                            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
                        }, void 0, false, {
                            fileName: "[project]/app/components/NearbyMap.tsx",
                            lineNumber: 269,
                            columnNumber: 11
                        }, this),
                        flyTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Recenter, {
                            position: flyTo
                        }, void 0, false, {
                            fileName: "[project]/app/components/NearbyMap.tsx",
                            lineNumber: 273,
                            columnNumber: 21
                        }, this),
                        userPos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                            position: userPos,
                            icon: userIcon,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                                children: "You are here"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NearbyMap.tsx",
                                lineNumber: 276,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/NearbyMap.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this),
                        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$universities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["universities"].map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                                position: [
                                    u.lat,
                                    u.lng
                                ],
                                icon: uniIcon,
                                eventHandlers: {
                                    click: ()=>setSelected(u)
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'DM Sans',sans-serif",
                                            minWidth: 180
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: u.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NearbyMap.tsx",
                                                lineNumber: 288,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12.5,
                                                    color: "#666",
                                                    margin: "4px 0"
                                                },
                                                children: [
                                                    u.city,
                                                    ", ",
                                                    u.country
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/NearbyMap.tsx",
                                                lineNumber: 289,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12.5,
                                                    marginBottom: 6
                                                },
                                                children: u.scholarship
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NearbyMap.tsx",
                                                lineNumber: 292,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: u.website,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                style: {
                                                    fontSize: 12.5
                                                },
                                                children: "Visit website →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NearbyMap.tsx",
                                                lineNumber: 293,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/NearbyMap.tsx",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NearbyMap.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this)
                            }, u.name, false, {
                                fileName: "[project]/app/components/NearbyMap.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/NearbyMap.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/NearbyMap.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/NearbyMap.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s1(NearbyMap, "w2l2pih/sl+DcXX1GMPJbcFUaOg=");
_c1 = NearbyMap;
var _c, _c1;
__turbopack_context__.k.register(_c, "Recenter");
__turbopack_context__.k.register(_c1, "NearbyMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/NearbyMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/components/NearbyMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=app_components_NearbyMap_tsx_067pq-f._.js.map