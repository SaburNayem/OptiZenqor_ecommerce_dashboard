import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import SideDetailPanel from "../../../shared/feedback/SideDetailPanel";
import { adminRequest } from "../../../shared/api/adminApi";

function OrdersPage() {
  const [state, setState] = useState({ loading: true, error: "", orders: [], activeOrderId: "" });

  async function load(activeOrderId = state.activeOrderId) {
    try {
      const orders = await adminRequest("/admin/orders");
      setState({
        loading: false,
        error: "",
        orders,
        activeOrderId: activeOrderId || orders[0]?.id || "",
      });
    } catch (error) {
      setState({ loading: false, error: error.message || "Unable to load orders.", orders: [], activeOrderId: "" });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(orderId, status) {
    const paymentStatus =
      status === "PAID" || status === "DELIVERED"
        ? "PAID"
        : status === "REFUNDED"
          ? "REFUNDED"
          : status === "CANCELLED"
            ? "FAILED"
            : undefined;

    await adminRequest(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, paymentStatus }),
    });
    await load(orderId);
  }

  const activeOrder = state.orders.find((order) => order.id === state.activeOrderId);

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading orders...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Order management" subtitle="Track app and website orders from placement to fulfillment.">
            <DataTable
              columns={["Order", "Customer", "Items", "Total", "Status"]}
              rows={state.orders.map((order) => (
                <tr key={order.id} onClick={() => setState((current) => ({ ...current, activeOrderId: order.id }))}>
                  <td>{order.orderNumber}</td>
                  <td>{order.user.fullName}</td>
                  <td>{order.items.length}</td>
                  <td>{`BDT ${Number(order.total || 0).toLocaleString()}`}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <SideDetailPanel title="Order detail" subtitle="Inspect and update the selected order.">
            {activeOrder ? (
              <div className="feature-list">
                <article className="feature-card">
                  <h3>{activeOrder.orderNumber}</h3>
                  <p>{`${activeOrder.user.fullName} · ${activeOrder.user.email}`}</p>
                  <p>{`${activeOrder.status} · ${activeOrder.paymentStatus}`}</p>
                </article>
                <article className="feature-card">
                  <h3>Status control</h3>
                  <select value={activeOrder.status} onChange={(event) => updateStatus(activeOrder.id, event.target.value)}>
                    {["PENDING", "PAID", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"].map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </article>
              </div>
            ) : null}
          </SideDetailPanel>
        </div>
      </section>
    </div>
  );
}

export default OrdersPage;
