import { useState } from "react";
import DashboardSection from "../shared/ui/DashboardSection";
import InsightCard from "../shared/ui/InsightCard";
import StatusBadge from "../shared/ui/StatusBadge";
import { useDashboard } from "../store/DashboardContext";

function ChatPage() {
  const dashboard = useDashboard();
  const [activeThreadId, setActiveThreadId] = useState(dashboard.chatThreads[0]?.id || "");
  const [message, setMessage] = useState("");

  const activeThread =
    dashboard.chatThreads.find((thread) => thread.id === activeThreadId) ||
    dashboard.chatThreads[0];

  function handleSend(event) {
    event.preventDefault();
    if (!activeThread) return;
    dashboard.sendChatMessage(activeThread.id, message);
    setMessage("");
  }

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard eyebrow="Support" title="Open chats" value={dashboard.chatThreads.filter((thread) => thread.status === "Open").length} description="Customer chats requiring active admin response." />
        <InsightCard eyebrow="Support" title="Pending chats" value={dashboard.chatThreads.filter((thread) => thread.status === "Pending").length} description="Threads waiting an admin first reply." />
        <InsightCard eyebrow="Support" title="Closed chats" value={dashboard.chatThreads.filter((thread) => thread.status === "Closed").length} description="Resolved support threads archived by the team." />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Support inbox" subtitle="Customer chat threads handled by the admin team.">
            <div className="chat-list">
              {dashboard.chatThreads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  className={`chat-thread ${thread.id === activeThread?.id ? "active" : ""}`}
                  onClick={() => setActiveThreadId(thread.id)}
                >
                  <div>
                    <strong>{thread.customerName}</strong>
                    <p>{thread.channel} • {thread.orderRef}</p>
                  </div>
                  <StatusBadge value={thread.status} toneMap={dashboard.toneMap} />
                </button>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title="Live conversation" subtitle="Reply, resolve, and manage customer messages.">
            {activeThread ? (
              <>
                <div className="chat-messages">
                  {activeThread.messages.map((item) => (
                    <article key={item.id} className={`chat-bubble ${item.sender}`}>
                      <strong>{item.sender === "admin" ? "Admin" : activeThread.customerName}</strong>
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </article>
                  ))}
                </div>
                <form className="chat-form" onSubmit={handleSend}>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write a reply to the customer"
                  />
                  <div className="chat-actions">
                    <button type="submit" className="primary-button">Send reply</button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => dashboard.closeChat(activeThread.id)}
                    >
                      Close chat
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <p>No chat selected.</p>
            )}
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default ChatPage;
