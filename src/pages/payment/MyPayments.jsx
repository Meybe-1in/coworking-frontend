import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import { getPayments } from "../../api/paymentApi";

const MyPayments = () => {

  const [payments, setPayments] = useState([]);

  const loadPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <>
      <NavbarUser />

      <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            Mis pagos
          </h1>

          {payments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <p className="text-slate-500">
                Aún no tienes pagos realizados.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-2xl shadow p-5 border border-slate-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {payment.roomName}
                      </h2>

                      <p className="text-sm text-slate-500">
                        Pagado el{" "}
                        {new Date(payment.paidAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">

                      <div>
                        <p className="text-sm text-slate-500">
                          Monto
                        </p>

                        <p className="font-bold text-slate-800">
                          ${payment.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Método
                        </p>

                        <p className="font-medium text-slate-700">
                          {payment.paymentMethod}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                        {payment.status}
                      </span>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MyPayments;