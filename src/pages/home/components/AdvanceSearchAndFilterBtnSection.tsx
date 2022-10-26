import React from 'react'
import { useAppSelector } from '../../../redux/Hooks'
import { Button } from '../../../commonComponents/Button';

export function AdvanceSearchAndFilterBtnSection({advanceSearchAndFilterShowHandler } : {advanceSearchAndFilterShowHandler : Function}) {

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);  

  const advanceSearchAndFilterClickHandler = ( // used to toggle and collapse the advance search and filter UI!!!
    key: string,
    howMuchScrollTheRefToTop: number,
    scrollBehaviour: string
  ) => {
    advanceSearchAndFilterShowHandler(key,howMuchScrollTheRefToTop,scrollBehaviour)
  };

  return (
    <div className="d-flex justify-content-end">
      <Button
        hasExtraPad={false}
        text={"Advanced Search"}
        upperCaseText={false}
        btnHasRadius={true}
        btnHasImg={true}
        btnClickHandler={() =>
          advanceSearchAndFilterClickHandler("advanceSearchShow", 0, "auto")
        }
        fontSize={lowFont}
        imgUrl={"./images/advance-search-image.png"}
        loadingCase={false}
        isLoading={false}
        hasMarginLeft={true}
        textCenter={false}
      />
      <Button
        hasExtraPad={false}
        text={"Filter"}
        upperCaseText={false}
        btnHasRadius={true}
        btnHasImg={true}
        btnClickHandler={() =>
          advanceSearchAndFilterClickHandler("filteringShow", 0, "auto")
        }
        fontSize={lowFont}
        imgUrl={"./images/filter-image.png"}
        loadingCase={false}
        isLoading={false}
        hasMarginLeft={true}
        textCenter={false}
      />
      <Button
        hasExtraPad={false}
        text={"Import"}
        upperCaseText={false}
        btnHasRadius={true}
        btnHasImg={true}
        btnClickHandler={() =>
          alert("Not available now!")
        }
        fontSize={lowFont}
        imgUrl={"./images/import-image.png"}
        loadingCase={false}
        isLoading={false}
        hasMarginLeft={true}
        textCenter={false}
      />
    </div>
  )
}
