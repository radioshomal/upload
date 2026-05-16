/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import {
  G as useAuth,
  J as useNavigate,
  r as React,
  p as useQueryClient,
  j as jsx,

  B as Button,
  M as TicketIcon,
  K as AnimatePresence,
  m as motion,

  X as CloseIcon,
  I as Input,

  o as useQuery,
  t as toast,

  g as formatDate,
  l as formatRelative
} from "./0Dmh-Cmn.js";

import {
  C as ChevronLeft,
  S as SendIcon
} from "./BpgMS7XR.js";

import {
  P as PlusIcon,
  T as TrashIcon
} from "./8Rs16s_B.js";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const API_BASE =
  "/".replace(/\/$/, "") + "/api";

/* -------------------------------------------------------------------------- */
/*                              AUTH / HEADERS                                */
/* -------------------------------------------------------------------------- */

function getToken() {
  return (
    localStorage.getItem("filehost_token") ||
    sessionStorage.getItem("filehost_token") ||
    ""
  );
}

function getHeaders() {
  return {
    "Content-Type": "application/json",

    Authorization:
      `Bearer ${getToken()}`
  };
}

/* -------------------------------------------------------------------------- */
/*                                    API                                     */
/* -------------------------------------------------------------------------- */

async function fetchTickets(page = 1) {
  const response = await fetch(
    `${API_BASE}/tickets?page=${page}&limit=20`,
    {
      headers: getHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "خطا در دریافت تیکت‌ها"
    );
  }

  return response.json();
}

async function fetchTicket(ticketId) {
  const response = await fetch(
    `${API_BASE}/tickets/${ticketId}`,
    {
      headers: getHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "تیکت یافت نشد"
    );
  }

  return response.json();
}

async function createTicket(
  subject,
  message
) {
  const response = await fetch(
    `${API_BASE}/tickets`,
    {
      method: "POST",

      headers: getHeaders(),

      body: JSON.stringify({
        subject,
        message
      })
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "خطا در ایجاد تیکت"
    );
  }

  return data;
}

async function sendReply(
  ticketId,
  message
) {
  const response = await fetch(
    `${API_BASE}/tickets/${ticketId}/replies`,
    {
      method: "POST",

      headers: getHeaders(),

      body: JSON.stringify({
        message
      })
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "خطا در ارسال پاسخ"
    );
  }

  return data;
}

async function deleteTicket(ticketId) {
  const response = await fetch(
    `${API_BASE}/tickets/${ticketId}`,
    {
      method: "DELETE",
      headers: getHeaders()
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "خطا در حذف تیکت"
    );
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                                 MAIN PAGE                                  */
/* -------------------------------------------------------------------------- */

function SupportTicketsPage() {
  const {
    isAuthenticated,
    isLoading,
    user
  } = useAuth();

  const [, navigate] =
    useNavigate();

  const [
    selectedTicketId,
    setSelectedTicketId
  ] = React.useState(null);

  const [
    showCreateForm,
    setShowCreateForm
  ] = React.useState(false);

  const [subject, setSubject] =
    React.useState("");

  const [message, setMessage] =
    React.useState("");

  const [reply, setReply] =
    React.useState("");

  const [page, setPage] =
    React.useState(1);

  const queryClient =
    useQueryClient();

  /* ----------------------------- LOADING STATE ---------------------------- */

  if (isLoading) {
    return null;
  }

  /* ------------------------------ AUTH CHECK ------------------------------ */

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  /* ---------------------------------------------------------------------- */

  return jsx.jsxs("div", {
    className:
      "max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-4 sm:space-y-6",

    children: [

      /* ------------------------------ HEADER ------------------------------ */

      jsx.jsxs("div", {
        className:
          "flex items-center justify-between gap-3",

        children: [

          /* ------------------------- LEFT SECTION ------------------------- */

          jsx.jsxs("div", {
            className:
              "flex-1 min-w-0",

            children: [

              /* -------------------------- BACK BTN -------------------------- */

              selectedTicketId &&
                jsx.jsxs(Button, {
                  variant: "ghost",
                  size: "sm",

                  onClick: () => {
                    setSelectedTicketId(
                      null
                    );

                    queryClient.invalidateQueries({
                      queryKey: [
                        "tickets"
                      ]
                    });
                  },

                  className:
                    "gap-1.5 mb-1 -mr-2",

                  children: [
                    jsx.jsx(
                      ChevronLeft,
                      {
                        className:
                          "w-4 h-4 rotate-180"
                      }
                    ),

                    "بازگشت"
                  ]
                }),

              /* --------------------------- TITLE --------------------------- */

              jsx.jsxs("h1", {
                className:
                  "text-xl sm:text-3xl font-bold font-display flex items-center gap-2",

                children: [
                  jsx.jsx(
                    TicketIcon,
                    {
                      className:
                        "w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0"
                    }
                  ),

                  jsx.jsx("span", {
                    className:
                      "truncate",

                    children:
                      "تیکت‌های پشتیبانی"
                  })
                ]
              }),

              jsx.jsx("p", {
                className:
                  "text-muted-foreground mt-0.5 text-xs sm:text-sm",

                children:
                  "با تیم پشتیبانی GuardNET در ارتباط باشید"
              })
            ]
          }),

          /* ---------------------- CREATE TICKET BTN ---------------------- */

          !selectedTicketId &&
            jsx.jsxs(Button, {
              onClick: () =>
                setShowCreateForm(
                  !showCreateForm
                ),

              size: "sm",

              className:
                "gap-1.5 shrink-0",

              children: [
                jsx.jsx(PlusIcon, {
                  className:
                    "w-4 h-4"
                }),

                jsx.jsx("span", {
                  className:
                    "hidden xs:inline",

                  children:
                    "تیکت جدید"
                }),

                jsx.jsx("span", {
                  className:
                    "xs:hidden",

                  children: "جدید"
                })
              ]
            })
        ]
      }),

      /* -------------------------- CREATE FORM -------------------------- */

      jsx.jsx(AnimatePresence, {
        children:
          showCreateForm &&
          !selectedTicketId &&
          jsx.jsx(
            CreateTicketForm,
            {
              subject,
              setSubject,

              message,
              setMessage,

              onCancel: () => {
                setShowCreateForm(
                  false
                );

                setSubject("");
                setMessage("");
              },

              onSuccess:
                (ticketId) => {
                  setShowCreateForm(
                    false
                  );

                  setSubject("");
                  setMessage("");

                  queryClient.invalidateQueries({
                    queryKey: [
                      "tickets"
                    ]
                  });

                  setSelectedTicketId(
                    ticketId
                  );
                }
            }
          )
      }),

      /* ---------------------------- CONTENT ---------------------------- */

      selectedTicketId
        ? jsx.jsx(TicketDetails, {
            ticketId:
              selectedTicketId,

            reply,
            setReply,

            isAdmin:
              user?.role ===
              "admin",

            onBack: () => {
              setSelectedTicketId(
                null
              );

              queryClient.invalidateQueries({
                queryKey: [
                  "tickets"
                ]
              });
            },

            onReply: () => {
              queryClient.invalidateQueries({
                queryKey: [
                  "ticket",
                  selectedTicketId
                ]
              });
            },

            onDelete: () => {
              setSelectedTicketId(
                null
              );

              queryClient.invalidateQueries({
                queryKey: [
                  "tickets"
                ]
              });
            }
          })

        : jsx.jsx(TicketsList, {
            page,
            setPage,

            onSelect:
              setSelectedTicketId
          })
    ]
  });
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export {
  SupportTicketsPage as default
};
