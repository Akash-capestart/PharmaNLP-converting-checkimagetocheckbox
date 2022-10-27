import React from "react";

export function SelectAllArticleCircleUI({
  selectAllArticlesHandler,
  allArticlesSelected,
}: {
  selectAllArticlesHandler: Function;
  allArticlesSelected: boolean;
}) {
  const selectAllArticlesClickHandler = (mode: string) =>
    selectAllArticlesHandler(mode);

  const handleChange = (event: any) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
      selectAllArticlesClickHandler("selectAll");
    } else {
      console.log("⛔️ Checkbox is NOT checked");
      selectAllArticlesClickHandler("deSelectAll");
    }
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={allArticlesSelected}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <span></span>
      </label>
      {/* {!allArticlesSelected ? (
                <>
                    <img
                        className="w-20 cursor-pointer"
                        src="/images/selectable-image.png"
                        onClick={() => selectAllArticlesClickHandler("selectAll")}
                        alt="Selectable..."
                    /><span className="low-font has-font-weight text-dark-gray pad-l-5">All</span>
                </>

            ) : (
                <>
                    <img
                        className="w-20 cursor-pointer"
                        src="/images/circle-selected-image.png"
                        onClick={() => selectAllArticlesClickHandler("deSelectAll")}
                        alt="Selectable..."
                    /><span className="low-font has-font-weight text-dark-gray pad-l-5">All</span>
                </>
            )} */}
    </>
  );
}
