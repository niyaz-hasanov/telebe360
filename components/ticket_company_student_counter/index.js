import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import styles from './statsCounters.module.css';
import { MAINURL } from '../../utils/constants';

const API = {
  students: 'api/v1/stats/students/count',
  companies: 'api/v1/stats/companies/count/all',
  tickets: 'api/v1/stats/tickets/count/active',
};

function readCount(res) {
  const n = Number(res?.data?.count ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export default function StatsCounters() {
  const [targets, setTargets] = useState({ students: 0, companies: 0, tickets: 0 });
  const [values, setValues] = useState({ students: 0, companies: 0, tickets: 0 });
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef(null);
  const startedRef = useRef(false);
  const fetchingRef = useRef(false);

  const tickRef = useRef(null);
  const currentRef = useRef({ students: 0, companies: 0, tickets: 0 });

  // ✅ students son 4 için zaman biriktirme (1 dk)
  const lastTickTimeRef = useRef(0);
  const studentsAccumRef = useRef(0);

  useEffect(() => {
    let mounted = true;

    async function fetchStats() {
      if (fetchingRef.current) return;
      fetchingRef.current = true;

      try {
        const [studentsRes, companiesRes, ticketsRes] = await Promise.all([
          axios.get(`${MAINURL}${API.students}`),
          axios.get(`${MAINURL}${API.companies}`),
          axios.get(`${MAINURL}${API.tickets}`),
        ]);

        const nextTargets = {
          students: readCount(studentsRes),
          companies: readCount(companiesRes),
          tickets: readCount(ticketsRes),
        };

        if (mounted) {
          setTargets(nextTargets);
          setLoaded(true);
        }
      } catch (e) {
        console.warn('STATS API ERROR:', e);
        if (mounted) setLoaded(true);
      }
    }

    fetchStats();
    return () => {
      mounted = false;
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!loaded) return;
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          startSyncedOdometer();
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    if (!startedRef.current) return;
    startSyncedOdometer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, targets.students, targets.companies, targets.tickets]);

  const startSyncedOdometer = () => {
    if (tickRef.current) clearInterval(tickRef.current);

    const t = {
      students: Math.max(0, Number(targets.students || 0)),
      companies: Math.max(0, Number(targets.companies || 0)),
      tickets: Math.max(0, Number(targets.tickets || 0)),
    };

    // küçükse 0, büyükse -30
    const OFFSET = 30;
    const start = {
      students: t.students > OFFSET ? t.students - OFFSET : 0,
      companies: t.companies > OFFSET ? t.companies - OFFSET : 0,
      tickets: t.tickets > OFFSET ? t.tickets - OFFSET : 0,
    };

    currentRef.current = { ...start };
    setValues(start);

    const BASE_TICK_MS = 120;

    // students son 4: 1 dakikada 1 artsın
    const STUDENTS_LAST4_MS = 3000;
    const studentsSlowThreshold = Math.max(0, t.students - 3);

    lastTickTimeRef.current = performance.now();
    studentsAccumRef.current = 0;

    tickRef.current = setInterval(() => {
      const now = performance.now();
      const dt = now - lastTickTimeRef.current;
      lastTickTimeRef.current = now;

      studentsAccumRef.current += dt;
      stepAll();
    }, BASE_TICK_MS);

    function stepAll() {
      const cur = currentRef.current;

      const nextCompanies = cur.companies < t.companies ? cur.companies + 1 : cur.companies;
      const nextTickets = cur.tickets < t.tickets ? cur.tickets + 1 : cur.tickets;

      let nextStudents = cur.students;
      if (cur.students < t.students) {
        if (cur.students >= studentsSlowThreshold) {
          if (studentsAccumRef.current >= STUDENTS_LAST4_MS) {
            studentsAccumRef.current -= STUDENTS_LAST4_MS;
            nextStudents = cur.students + 1;
          }
        } else {
          nextStudents = cur.students + 1;
          studentsAccumRef.current = 0;
        }
      }

      const next = {
        students: nextStudents,
        companies: nextCompanies,
        tickets: nextTickets,
      };

      if (
        next.students === t.students &&
        next.companies === t.companies &&
        next.tickets === t.tickets
      ) {
        currentRef.current = next;
        setValues(next);
        clearInterval(tickRef.current);
        tickRef.current = null;
        return;
      }

      if (
        next.students !== cur.students ||
        next.companies !== cur.companies ||
        next.tickets !== cur.tickets
      ) {
        currentRef.current = next;
        setValues(next);
      }
    }
  };

  return (
    <section ref={containerRef} className={styles.section}>
      <h2 className={styles.title}>Birlikdə böyüyürük!</h2>

      <div className={styles.wrapper}>
        {/* Desktop order: Partner / Users / Tickets */}
        {/* Mobile layout CSS ile: Users üstte geniş, altta Partner + Tickets */}
        <FlipStatCard
          className={styles.cardPartner}
          iconSrc="/counter_star.svg"
          iconAlt="Partner"
          label="Partnyor"
          value={values.companies}
          digits={3}
        />

        <FlipStatCard
          className={styles.cardUsers}
          iconSrc="/counter_cap.svg"
          iconAlt="İstifadəçi sayı"
          label="İstifadəçi sayı"
          value={values.students}
          digits={5}
        />

        <FlipStatCard
          className={styles.cardTickets}
          iconSrc="/counter_ticket.svg"
          iconAlt="Aktiv bilet sayı"
          label="Aktiv bilet sayı"
          value={values.tickets}
          digits={4}
        />
      </div>
    </section>
  );
}

function FlipStatCard({ className = '', iconSrc, iconAlt, label, value, digits }) {
  const padded = useMemo(() => String(value ?? 0).padStart(digits, '0'), [value, digits]);

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.iconWrap}>
        <img className={styles.icon} src={iconSrc} alt={iconAlt} />
      </div>

      <div className={styles.digitsRow} aria-label={`${label}: ${padded}`}>
        {padded.split('').map((ch, idx) => (
          <FlipDigit key={idx} digit={ch} />
        ))}
      </div>

      <div className={styles.label}>{label}</div>
    </div>
  );
}

/**
 * Sayaç animasyonu aynı — sadece görsel sınıflar CSS’de.
 * (Ortadaki çizgi default yok, sadece isFlipping sırasında var.)
 */
function FlipDigit({ digit }) {
  const DURATION_MS = 420;

  const safeDigit = (d) => {
    const s = String(d ?? '0');
    return s.length ? s : '0';
  };

  const currentRef = useRef(safeDigit(digit));
  const animatingRef = useRef(false);
  const queuedRef = useRef(null);

  const [frontNum, setFrontNum] = useState(currentRef.current);
  const [backNum, setBackNum] = useState(currentRef.current);
  const [change, setChange] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const runFlip = (toRaw) => {
    const to = safeDigit(toRaw);
    const from = currentRef.current;
    if (to === from) return;

    animatingRef.current = true;
    setIsFlipping(true);

    setBackNum(from);
    setFrontNum(to);
    setChange((c) => !c);
    currentRef.current = to;

    setTimeout(() => {
      animatingRef.current = false;
      setIsFlipping(false);

      const q = queuedRef.current;
      queuedRef.current = null;

      if (q != null && safeDigit(q) !== currentRef.current) {
        runFlip(q);
      }
    }, DURATION_MS);
  };

  useEffect(() => {
    const next = safeDigit(digit);

    if (animatingRef.current) {
      queuedRef.current = next;
      return;
    }

    runFlip(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digit]);

  const animation1 = change ? styles.fold : styles.unfold;
  const animation2 = !change ? styles.fold : styles.unfold;

  const number1 = change ? backNum : frontNum;
  const number2 = !change ? backNum : frontNum;

  return (
    <div className={`${styles.flipCounter} ${isFlipping ? styles.isFlipping : ''}`}>
      <div className={styles.upperCard}>
        <span>{frontNum}</span>
      </div>

      <div className={styles.lowerCard}>
        <span>{backNum}</span>
      </div>

      <div className={`${styles.flipCard} ${styles.first} ${animation1}`}>
        <span>{number1}</span>
      </div>

      <div className={`${styles.flipCard} ${styles.second} ${animation2}`}>
        <span>{number2}</span>
      </div>
    </div>
  );
}
