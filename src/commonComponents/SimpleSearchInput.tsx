import React from 'react'

export function SimpleSearchInput({
    simpleSearchHandler,
    fullArticleFetchHandler,
    searchKeyWordChangeHandler,
    searchKeyWord
}: {
    simpleSearchHandler: Function,
    fullArticleFetchHandler: Function,
    searchKeyWordChangeHandler: Function,
    searchKeyWord : string
}) {

    const userEnteredKeyWordHandler = (keyWord: string) => searchKeyWordChangeHandler(keyWord);

    const enterKeyPressHandler = async (userPressedKey: React.KeyboardEvent<HTMLElement>) => {
        if (userPressedKey.key === "Enter") {
            if (searchKeyWord !== "") simpleSearchHandler(); 
            else fullArticleFetchHandler();
        }                    
    }

    return (
        <div className="position-relative">
            <input placeholder="Basic Search" className="search-field basic-search-field mar-l-15 mar-r-15" onChange={(e) => userEnteredKeyWordHandler(e.target.value)} onKeyDown={(e) => enterKeyPressHandler(e)} />
            <img
                src="/images/search-image.png"
                className="position-absolute w-20 cursor-pointer"
                style={{ right: 25, top: 12 }}
                alt="Search..."
                onClick={() => simpleSearchHandler()}
            />
        </div>
    )
}
