import React, { useRef, useState } from "react";
import { AdvanceSearchComponent } from "./AdvanceSearchComponent";
import { RelevantArticlesListsAndFullTextSection } from "./RelevantArticlesListsAndFullTextSection";
import { FilteringComponent } from "./FilteringComponent";
import RelevantArticlesSearchSection from "./RelevantArticlesSearchSection";
import { AdvanceSearchAndFilterBtnSection } from "./AdvanceSearchAndFilterBtnSection";
import { RelevantArticlesModalBtnSection } from "./RelevantArticlesModalBtnSection";

export function RelevantArticlesSection({ innerHeight }: { innerHeight: number }) {

  const advanceSearchContentRef = useRef<HTMLDivElement>(null!);
  const filteringContentRef = useRef<HTMLDivElement>(null!);
  const scrollToTopRef = useRef<HTMLDivElement | any>(null!);

  const [advanceSearchAndFilterState, setadvanceSearchAndFilterState] = useState({
    filteringContentHeight: 0,
    advanceSearchContentHeight: 0
  })

  const advanceSearchAndFilterShowHandler = ( // used to toggle and collapse the advance search and filter UI!!!
    key: string,
    howMuchScrollTheRefToTop: number,
    scrollBehaviour: string
  ) => {
    if (key === "advanceSearchShow") 
      setadvanceSearchAndFilterState({
        ...advanceSearchAndFilterState,
        advanceSearchContentHeight : advanceSearchAndFilterState["advanceSearchContentHeight"] === 0 ? advanceSearchContentRef.current.scrollHeight : 0,
        filteringContentHeight : 0 
      })
    else if (key === "filteringShow")
      setadvanceSearchAndFilterState({
        ...advanceSearchAndFilterState,
        advanceSearchContentHeight : 0,
        filteringContentHeight : advanceSearchAndFilterState["filteringContentHeight"] === 0 ? filteringContentRef.current.scrollHeight : 0,
      })
    scrollToTopHandler(howMuchScrollTheRefToTop, scrollBehaviour);
  };

  const scrollToTopHandler = (howMuchScrollTheRefToTop: number, scrollBehaviour: string) => {
    if (scrollBehaviour === "smooth") setTimeout(() => scrollHandler(howMuchScrollTheRefToTop, scrollBehaviour), 400); // this condition is used to delay the scrolling or the scrollToTopRef won't fully scrolled!!
    else scrollHandler(howMuchScrollTheRefToTop, scrollBehaviour);
  };

  const scrollHandler = (howMuchScrollTheRefToTop: number, scrollBehaviour: string) => scrollToTopRef.current.scrollTo({
    top: howMuchScrollTheRefToTop,
    behavior: scrollBehaviour,
  });

  const collapseHandler = () => { // this function helps to find the which one is toggled? advance search or filter content!!!
    let toCollapse;
    if (advanceSearchAndFilterState["advanceSearchContentHeight"] === 0 && advanceSearchAndFilterState["filteringContentHeight"] === 0) toCollapse = "";
    else toCollapse = advanceSearchAndFilterState["advanceSearchContentHeight"] !== 0 ? "advanceSearchShow" : "filteringShow";
    return toCollapse;
  };

  return (
    <>
      <div className="row no-margin align-items-center">
        <div className="col-md-6 no-padding">
          <RelevantArticlesSearchSection />
        </div>
        <div className="col-md-6 no-padding">
          <div className="d-flex justify-content-end">
            <AdvanceSearchAndFilterBtnSection advanceSearchAndFilterShowHandler={advanceSearchAndFilterShowHandler}/>
            <RelevantArticlesModalBtnSection />
          </div>
        </div>
      </div>
      <div
        className="overflow-auto white-background"
        style={{ height: innerHeight - 135 }}
        ref={scrollToTopRef}
      >
        <div
          ref={advanceSearchContentRef}
          className="smooth-height-animation"
          style={{
            height: advanceSearchAndFilterState["advanceSearchContentHeight"],
          }}
        >
          <AdvanceSearchComponent
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler("advanceSearchShow", 0, "smooth")}
          />
        </div>
        <div
          ref={filteringContentRef}
          className="smooth-height-animation"
          style={{
            height: advanceSearchAndFilterState["filteringContentHeight"],
          }}
        >
          <FilteringComponent
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler("filteringShow", 0, "smooth")}
          />
        </div>
        <div className="pad-15 h-100">
          <RelevantArticlesListsAndFullTextSection
            articleViewHeight={innerHeight - 135}
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler(collapseHandler(), 110, "smooth")}
            scrollToTopHandler={scrollToTopHandler}
          />
        </div>
      </div>
    </>
  );
}
