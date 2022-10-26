import React, { useState } from 'react'
import { DropDown } from '../../../commonComponents/DropDown'
import { useAppSelector } from '../../../redux/Hooks';

type ArticleViewButtonSectionState = {
    activeDropDownVal: string,
    moveToFolderModalShow: boolean
}

export default function RelevantArticlesDropDownSection() {

    const { lowFont } = useAppSelector((state) => state.globalFontResizer)

    const dropDownValues = ["Published Date", "Recently Added"];

    const [articleViewButtonSectionState, setarticleViewButtonSectionState] = useState<ArticleViewButtonSectionState>({
        activeDropDownVal: dropDownValues[0],
        moveToFolderModalShow: false,
    });

    const dropDownValueHandler = (val: string) => setarticleViewButtonSectionState({
        ...articleViewButtonSectionState,
        activeDropDownVal: val,
    });

    return (
        <>
            <span
                className="font-change-animation"
                style={{ fontSize: lowFont }}
            >
                Sort By : &nbsp;
            </span>
            <DropDown
                activeDropDownVal={articleViewButtonSectionState["activeDropDownVal"]}
                changeValHandler={dropDownValueHandler}
                dropdownValues={dropDownValues}
                width={175}
                dropDownHeight={"auto"}
                boxHeight={"auto"}
                hasBorder={true}
                backGroundColor={""}
                datePicker={false}
            />

        </>
    )
}
