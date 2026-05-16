import {
  c as createLucideIcon,
  h as useTheme,
  e as seo,
  j as jsxRuntime,
  m as motion,
  N as InfoIcon,
  O as ShieldIcon,
  U as UploadIcon,
  F as TextIcon,
  L as LockIcon,
  x as ClockIcon,
  P as DashboardIcon,
  M as SupportIcon,
  T as SettingsIcon,
  Z as CheckIcon
} from "./0Dmh-Cmn.js";

import { D as DownloadIcon } from "./DD9mmw5L.js";

/* -------------------------------------------------------------------------- */
/*                                    ICONS                                   */
/* -------------------------------------------------------------------------- */

const chevronLeftPath = [
  [
    "path",
    {
      d: "m15 18-6-6 6-6",
      key: "1wnfg3"
    }
  ]
];

const ChevronLeft = createLucideIcon(
  "chevron-left",
  chevronLeftPath
);

/* -------------------------------------------------------------------------- */
/*                                  ANIMATION                                 */
/* -------------------------------------------------------------------------- */

const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 22
  },

  show: (index) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: index * 0.06,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

/* -------------------------------------------------------------------------- */
/*                                SECTION CARD                                */
/* -------------------------------------------------------------------------- */

function SectionCard({
  icon,
  title,
  children,
  index,

  accent,
  border,
  cardBg,
  textMain,
  textSub
}) {
  return jsxRuntime.jsxs(motion.div, {
    custom: index,
    initial: "hidden",
    whileInView: "show",
    viewport: {
      once: true,
      margin: "-60px"
    },
    variants: fadeUpVariant,

    style: {
      background: cardBg,
      border: `1px solid ${border}`,
      borderRadius: "20px",
      padding: "28px 30px",
      marginBottom: "20px"
    },

    children: [
      jsxRuntime.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "20px"
        },

        children: [
          jsxRuntime.jsx("div", {
            style: {
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              flexShrink: 0,

              background: "rgba(96,165,250,0.12)",
              border: "1.5px solid rgba(96,165,250,0.2)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: accent
            },

            children: icon
          }),

          jsxRuntime.jsx("h2", {
            style: {
              margin: 0,
              fontSize: "17px",
              fontWeight: 800,
              color: textMain
            },

            children: title
          })
        ]
      }),

      jsxRuntime.jsx("div", {
        style: {
          color: textSub,
          fontSize: "14px",
          lineHeight: "2.0"
        },

        children
      })
    ]
  });
}

/* -------------------------------------------------------------------------- */
/*                                  STEP ITEM                                 */
/* -------------------------------------------------------------------------- */

function StepItem({
  num,
  text,
  accent,
  textSub
}) {
  return jsxRuntime.jsxs("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      marginBottom: "12px"
    },

    children: [
      jsxRuntime.jsx("div", {
        style: {
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          flexShrink: 0,

          background: "rgba(96,165,250,0.15)",
          border: `1.5px solid ${accent}`,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "12px",
          fontWeight: 800,
          color: accent,

          marginTop: "2px"
        },

        children: num
      }),

      jsxRuntime.jsx("p", {
        style: {
          margin: 0,
          color: textSub,
          fontSize: "14px",
          lineHeight: "1.85"
        },

        children: text
      })
    ]
  });
}

/* -------------------------------------------------------------------------- */
/*                                   TAG CHIP                                 */
/* -------------------------------------------------------------------------- */

function TagChip({
  text,
  accent
}) {
  return jsxRuntime.jsx("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",

      padding: "3px 10px",
      borderRadius: "20px",

      background: "rgba(96,165,250,0.10)",
      border: "1px solid rgba(96,165,250,0.22)",

      fontSize: "12px",
      fontWeight: 600,
      color: accent,

      marginLeft: "6px",
      marginBottom: "6px"
    },

    children: text
  });
}

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

function GuidePage() {
  const { theme } = useTheme();

  const isLight = theme === "light";

  seo({
    title: "راهنمای استفاده — گارد نت",
    description:
      "راهنمای کامل استفاده از گارد نت؛ آپلود فایل، دانلود، پاسته متن، داشبورد و همه امکانات"
  });

  /* --------------------------------- COLORS -------------------------------- */

  const cardBg = isLight
    ? "rgba(240,245,255,0.6)"
    : "rgba(255,255,255,0.03)";

  const border = isLight
    ? "rgba(37,99,235,0.12)"
    : "rgba(96,165,250,0.12)";

  const textMain = isLight
    ? "#0f172a"
    : "#e2eeff";

  const textSub = isLight
    ? "rgba(15,23,42,0.68)"
    : "rgba(188,210,252,0.75)";

  const accent = isLight
    ? "#2563eb"
    : "#60a5fa";

  const softBorder = isLight
    ? "rgba(37,99,235,0.10)"
    : "rgba(96,165,250,0.10)";

  const sharedProps = {
    accent,
    border,
    cardBg,
    textMain,
    textSub
  };

  /* ------------------------------------------------------------------------ */

  return jsxRuntime.jsx("div", {
    style: {
      minHeight: "100vh",
      paddingTop: "100px",
      paddingBottom: "80px",
      direction: "rtl"
    },

    children: jsxRuntime.jsxs("div", {
      style: {
        maxWidth: "780px",
        margin: "0 auto",
        padding: "0 20px"
      },

      children: [

        /* ------------------------------ HERO AREA ----------------------------- */

        jsxRuntime.jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 30
          },

          animate: {
            opacity: 1,
            y: 0
          },

          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          },

          style: {
            textAlign: "center",
            marginBottom: "52px"
          },

          children: [
            jsxRuntime.jsxs("div", {
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",

                padding: "6px 16px",
                borderRadius: "20px",

                background: "rgba(96,165,250,0.10)",
                border: "1px solid rgba(96,165,250,0.22)",

                fontSize: "12px",
                fontWeight: 600,
                color: accent,

                marginBottom: "20px"
              },

              children: [
                jsxRuntime.jsx(InfoIcon, { size: 13 }),
                jsxRuntime.jsx("span", {
                  children: "راهنمای کامل"
                })
              ]
            }),

            jsxRuntime.jsxs("h1", {
              style: {
                fontSize: "clamp(26px, 5vw, 38px)",
                fontWeight: 900,
                color: textMain,

                margin: "0 0 14px",
                lineHeight: 1.25
              },

              children: [
                "از صفر تا صد با ",

                jsxRuntime.jsx("span", {
                  style: {
                    backgroundImage:
                      "linear-gradient(130deg, #60a5fa, #22d3ee)",

                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  },

                  children: "گارد نت"
                })
              ]
            }),

            jsxRuntime.jsx("p", {
              style: {
                fontSize: "15px",
                color: textSub,

                maxWidth: "520px",
                margin: "0 auto",

                lineHeight: "1.8"
              },

              children:
                "همه چیزی که باید درباره گارد نت بدانید — از آپلود اولین فایل تا مدیریت پیشرفته، کامل توضیح داده شده."
            })
          ]
        })

        // ادامه کد...
      ]
    })
  });
}

export { GuidePage as default };
