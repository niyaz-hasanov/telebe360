import { useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import css from "./css.module.css";
import BasicModal from "../../components/ticket_qr/index";
import { MAINURL, APIURL } from "../../utils/constants";

const formatDateTR = (dateStr) => {
  if (!dateStr) return "";
  const pure = String(dateStr).slice(0, 10);
  const [y, m, d] = pure.split("-");
  if (!y || !m || !d) return String(dateStr);
  return `${d}.${m}.${y}`;
};

// Aktiv önce gelsin
const statusRank = (used) => (used ? 1 : 0);

const getTicketUI = (ticket) => {
  const company = ticket?.registrator?.company;
  const companyName = company?.name || "";
  const logoPath = company?.logo_path || "";
  const discount = ticket?.registrator?.discount ?? "";
  const price = ticket?.registrator?.price ?? "";
  const endTime = formatDateTR(ticket?.registrator?.end_time); // ✅ end_time
  const isActive = !ticket?.used;

  return { companyName, logoPath, discount, price, endTime, isActive };
};

const TicketRow = ({ ticket, onQr, showQr = true }) => {
  const { companyName, logoPath, discount, price, endTime, isActive } =
    getTicketUI(ticket);

  return (
    <tr className={css.tr}>
      <td className={css.tdBrand}>
        <div className={css.brandCell}>
          <img
            className={css.logo}
            src={`${MAINURL}uploads/${logoPath}`}
            alt={companyName}
          />
          <div className={css.brandText}>
            <div className={css.brandName}>{companyName}</div>
          </div>
        </div>
      </td>

      <td className={css.td}>
        <span className={css.num}>{discount}%</span>
      </td>

      <td className={css.td}>
        <span className={css.price}>
          {price}
          <img className={css.coinIcon} src="/navbar_telebecoin.svg" alt="coin" />
        </span>
      </td>

      <td className={css.td}>
        <span className={css.date}>{endTime}</span>
      </td>

      <td className={css.tdStatus}>
        <span
          className={`${css.status} ${
            isActive ? css.statusActive : css.statusInactive
          }`}
        >
          {isActive ? "Aktiv" : "İstifadə edildi"}
        </span>
      </td>

      {showQr ? (
        <td className={css.tdQr}>
          <button
            className={css.qrBtn}
            type="button"
            onClick={() => onQr(ticket)}
            aria-label="QR"
            title="QR"
          >
            <img src="/tickets_qrcode.svg" alt="qr" />
          </button>
        </td>
      ) : (
        <td className={css.tdQrHidden} />
      )}
    </tr>
  );
};


const TicketCard = ({ ticket, onQr, showQr = true }) => {
  const { companyName, logoPath, discount, price, endTime, isActive } =
    getTicketUI(ticket);

  const title = `${companyName} – ${discount}%`;

  return (
    <div className={css.card}>
      <div className={css.cardTop}>
        <div className={css.cardTitleWrap}>
          <img
            className={css.cardLogo}
            src={`${MAINURL}uploads/${logoPath}`}
            alt={companyName}
          />
          <div className={css.cardTitle}>{title}</div>
        </div>

        {showQr && (
          <button
            className={css.cardQrBtn}
            type="button"
            onClick={() => onQr(ticket)}
            aria-label="QR"
            title="QR"
          >
            <img src="/tickets_qrcode.svg" alt="qr" />
          </button>
        )}
      </div>

      <div className={css.cardBody}>
        <div className={css.cardRow}>
          <span className={css.cardLabel}>Qiymət:</span>
          <span className={css.cardValue}>
            {price}
            <img className={css.cardCoin} src="/navbar_telebecoin.svg" alt="coin" />
          </span>
        </div>

        <div className={css.cardRow}>
          <span className={css.cardLabel}>Tarix:</span>
          <span className={css.cardValue}>{endTime}</span>
        </div>

        <div className={css.cardRow}>
          <span className={css.cardLabel}>Status:</span>
          <span
            className={`${css.cardStatus} ${
              isActive ? css.cardStatusActive : css.cardStatusInactive
            }`}
          >
            {isActive ? "Aktiv" : "İstifadə edildi"}
          </span>
        </div>
      </div>
    </div>
  );
};


const TicketTable = ({
  title,
  count,
  showFilter,
  sortOpen,
  setSortOpen,
  sortKey,
  setSortKey,
  dropdownRef,
  tickets,
  emptyText,
  onQr,
  isHistory = false, // (istersen artık kullanmayabilirsin)
  showHeader = true,
  showQr = true,
}) => {

  return (
    <div className={css.section}>
      <div className={css.sectionHeader}>
        <p className={css.sectionTitle}>{`${title} (${count})`}</p>

        {showFilter && (
          <div className={css.sortWrap} ref={dropdownRef}>
            <button
              className={css.filterBtn}
              type="button"
              onClick={() => setSortOpen((s) => !s)}
              aria-label="Sırala"
              title="Sırala"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5h18l-7 8v5l-4 2v-7L3 5z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {sortOpen && (
              <div className={css.dropdown}>
                <div className={css.dropdownTitle}><p>Sırala</p> <img src='/histor_dropdown_arrow.svg'/></div>

                <button
                  className={`${css.ddItem} ${
                    sortKey === "status" ? css.ddActive : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setSortKey("status");
                    setSortOpen(false);
                  }}
                >
                  Statusa görə
                </button>

                <button
                  className={`${css.ddItem} ${
                    sortKey === "discount" ? css.ddActive : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setSortKey("discount");
                    setSortOpen(false);
                  }}
                >
                  Faizə görə
                </button>

                <button
                  className={`${css.ddItem} ${
                    sortKey === "price" ? css.ddActive : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setSortKey("price");
                    setSortOpen(false);
                  }}
                >
                  Coin sayına görə
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* DESKTOP TABLE */}
    <div className={css.tableCard}>
  <div className={css.tableScroll}>
    <table className={css.table}>
      {showHeader && (
        <thead>
          <tr className={css.theadRow}>
            <th className={css.thBrand}>Marka</th>
            <th className={css.th}>Faiz</th>
            <th className={css.th}>Qiymət</th>
            <th className={css.th}>Tarix</th>
            <th className={css.thStatus}>Status</th>
            {showQr && <th className={css.thQr}>Bilet</th>}
          </tr>
        </thead>
      )}

      <tbody>
        {tickets.length > 0 ? (
          tickets.map((t) => (
            <TicketRow
              key={t.id}
              ticket={t}
              onQr={onQr}
              showQr={showQr}
            />
          ))
        ) : (
          <tr>
            <td className={css.empty} colSpan={showQr ? 6 : 5}>
              {emptyText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

      {/* MOBILE CARDS */}
     <div className={css.cards}>
  {tickets.length > 0 ? (
    tickets.map((t) => (
      <TicketCard key={t.id} ticket={t} onQr={onQr} showQr={showQr} />
    ))
  ) : (
    <div className={css.cardsEmpty}>{emptyText}</div>
  )}
</div>

    </div>
  );
};

const TicketPage = () => {
  const [activeTickets, setActiveTickets] = useState([]);
  const [historyTickets, setHistoryTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // sort (üst tablo)
  const [sortOpen, setSortOpen] = useState(false);
  const [sortKey, setSortKey] = useState("status"); // 'status' | 'discount' | 'price'
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("access_token");

    const fetchActive = async () => {
      try {
        const res = await fetch(`${APIURL}tickets/student/ticket`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("active fetch failed");
        const data = await res.json();
        setActiveTickets(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setActiveTickets([]);
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${APIURL}tickets/student/ticket/history`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("history fetch failed");
        const data = await res.json();
        setHistoryTickets(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setHistoryTickets([]);
      }
    };

    fetchActive();
    fetchHistory();
  }, []);

  // click-outside dropdown close
  useEffect(() => {
    const onDown = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const sortedActive = useMemo(() => {
    const arr = [...activeTickets];

    if (sortKey === "status") {
      arr.sort((a, b) => statusRank(a.used) - statusRank(b.used));
      return arr;
    }
    if (sortKey === "discount") {
      arr.sort(
        (a, b) =>
          (Number(b?.registrator?.discount) || 0) -
          (Number(a?.registrator?.discount) || 0)
      );
      return arr;
    }
    if (sortKey === "price") {
      arr.sort(
        (a, b) =>
          (Number(b?.registrator?.price) || 0) -
          (Number(a?.registrator?.price) || 0)
      );
      return arr;
    }
    return arr;
  }, [activeTickets, sortKey]);

  // history: tarihe göre (istersen end_time'a göre de sıralarız)
  const sortedHistory = useMemo(() => {
    const arr = [...historyTickets];
    // created_at yerine istersen end_time'a göre sıralayayım:
    arr.sort((a, b) => {
      const da = new Date(a?.registrator?.end_time || 0).getTime();
      const db = new Date(b?.registrator?.end_time || 0).getTime();
      return db - da;
    });
    return arr;
  }, [historyTickets]);

  const handleQr = (ticket) => {
    // history'de bile QR göstermek istenirse modal açar; istemiyorsan söyle kapatayım
    setSelectedTicket({
      qrCode: ticket.qr_code,
      companyName: ticket?.registrator?.company?.name || "",
      discount: ticket?.registrator?.discount ?? "",
      createdAt: formatDateTR(ticket?.created_at),
      endTime: formatDateTR(ticket?.registrator?.end_time), // ✅ end_time
      companyLogoPath: ticket?.registrator?.company?.logo_path || "",
    });
  };

  return (
    <div className={css.page}>
      <style jsx global>{`
        body {
          background-color: #6363631a;
        }
      `}</style>

      <Head>
        <title>Biletlər</title>
        <link rel="icon" href="/home/360minilogo.ico" />
      </Head>

     
<div className={css.container}>
  <TicketTable
    title="Aktiv biletlərim"
    count={activeTickets.length}
    showFilter={true}
    sortOpen={sortOpen}
    setSortOpen={setSortOpen}
    sortKey={sortKey}
    setSortKey={setSortKey}
    dropdownRef={dropdownRef}
    tickets={sortedActive}
    emptyText="Hazırda aktiv biletiniz yoxdur."
    onQr={handleQr}
    isHistory={false}
    showHeader={true}
    showQr={true}
  />

  <TicketTable
    title="Tarixçə"
    count={historyTickets.length}
    showFilter={false}
    sortOpen={false}
    setSortOpen={() => {}}
    sortKey={"status"}
    setSortKey={() => {}}
    dropdownRef={null}
    tickets={sortedHistory}
    emptyText="Hazırda tarixçəniz yoxdur."
    onQr={handleQr}
    showHeader={true}
    showQr={false}
  />
</div>



      {selectedTicket && (
        <BasicModal
          qrCode={selectedTicket.qrCode}
          companyName={selectedTicket.companyName}
          createdAt={selectedTicket.createdAt}
          endTime={selectedTicket.endTime}
          discount={selectedTicket.discount}
          companyLogoPath={selectedTicket.companyLogoPath}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default TicketPage;
