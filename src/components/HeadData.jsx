import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

const HeadData = ({lastUpdate, sensorsCount}) => {

  lastUpdate = format(new Date(lastUpdate), 'dd MMMM yyyy à HH:mm', {locale: frLocale});
  
    return (
        <div className="stats shadow px-20">
  
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="stat-title">Capteurs</div>
            <div className="stat-value">{sensorsCount}</div>
            <div className="stat-desc">En ligne</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <div className="stat-title">Dernière mise à jour le</div>
            <div className="stat-value">{lastUpdate}</div>
          </div>
  
        </div>
    );
};

export default HeadData;
