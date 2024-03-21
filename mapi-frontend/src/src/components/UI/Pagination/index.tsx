import arrowIcon from "src/assets/icons/arrow.svg";
import styles from "./pagination.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, MouseEvent } from "react";

type Props = {
  last_page: number,
}

const Pagination = ({last_page}: Props) => {
  
  const navigate = useNavigate()
  const locations = useLocation()
  const queryParams = new URLSearchParams(locations.search)
  
  const [active, setActive] = useState(1);

  const handleParamsUpdate = (page: number) => {
    setActive(page)
    queryParams.set("page", page.toString());
    const newSearch = `?${queryParams.toString()}`;
    window.scrollTo({ top: 300, behavior: "smooth" });
    navigate({ search: newSearch });
  };

  const nextPage = () => {
    if(active == last_page) return;
    handleParamsUpdate(active + 1);
    setActive(active + 1)
  };

  const previusPage = () => {
    if(active == 1) return;
    handleParamsUpdate(active - 1);
    setActive(active - 1)
  };

  const currentActiveNumber = () => {
    return  active == 4 || active == 3 || active == 2 || active == 1;
  }

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    handleParamsUpdate(parseInt(e.currentTarget.textContent ?? ""));
  }



  const activeNumber2 = (actual:number) => {
    if(actual == 5) return 4;
    if(actual == 4) return 4;
    if(actual == 0) return 3;
    return currentActiveNumber() ? 3 : actual;
  }
  const activeNumber3 = (actual:number) => {
    if(actual <= 5) return 5;
    return currentActiveNumber() ? 3 : actual;
  }

  const activeNumber4 = (actual:number) => {
    return  currentActiveNumber() ? 4 : actual;
  }

  const calcActive = (actual: number) =>{
    if(last_page - 3 == actual) return styles.current 
    if(actual > last_page - 3) return ''
    if(actual <  4) return ''
    return styles.current 
  }

  const paginationLogic = () => {
    return last_page - 3 == active || last_page - 2 == active || last_page - 1 == active || last_page == active
  }

  const calc2postion = () => {
    return active == 2 || active == 4 || (active - 2) == 1 || active == 2 || active == 1 ? '2' : '...'
  }

  return (
    <div className={styles.pagination}>
      <button className={styles.arrow} onClick={previusPage} >
        <img src={arrowIcon} alt="Arrow icon" />
      </button>
      
        { last_page <= 7 ?
            <ul>
              {Array.from({length: last_page}, (_, i) => (
                  <li key={i} className={active == i + 1 ? styles.current : ''} onClick={handleClick}>
                    <button>{i + 1}</button>
                  </li>
              ))}
            </ul>
          : <ul>
              <li className={active == 1 ? styles.current : ''} onClick={handleClick}>
                <button>1</button>
              </li>
              <li className={active == 2 ? styles.current : ''} onClick={handleClick}>
                <button>{ calc2postion() }</button>
              </li>
              <li className={active == activeNumber2(active-1) ? styles.current : ''} onClick={handleClick}>
                <button>{ paginationLogic() ? last_page - 4 : activeNumber2(active-1) }</button>
              </li>
              <li className={`${ calcActive(active)} ` } onClick={handleClick}>
                <button>{ paginationLogic() ? last_page - 3 : activeNumber4(active) }</button>
              </li>
              <li className={ active == last_page - 2 ? styles.current : ''} onClick={handleClick}>
                <button>{ paginationLogic() ? last_page - 2 : activeNumber3(active + 1)}</button>
              </li>
              <li className={active == last_page - 1 ? styles.current : ''} onClick={handleClick}>
                <button>{ paginationLogic() ? last_page - 1 : '...' }</button>
              </li>
              <li className={active == last_page ? styles.current : ''} onClick={handleClick}>
                <button>{last_page}</button>
              </li>
          </ul>
        }
        
      <button className={styles.arrow} onClick={nextPage} disabled={last_page == active}>
        <img src={arrowIcon} alt="Arrow icon" />
      </button>
    </div>
  );
};

export default Pagination;
