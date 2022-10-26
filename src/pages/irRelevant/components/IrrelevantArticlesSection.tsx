import React, { useState, useEffect } from 'react'
import { SelectAllArticleCircleUI } from '../../../commonComponents/SelectAllArticleCircleUI'
import { ArticleViewButtonSection } from '../../home/components/ArticleViewButtonSection'
import { IrrelevantArticlesLists } from './IrrelevantArticlesLists'
import { IrrelevantArticles } from '../../../IrrelevantArticles'
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks'
import { addIrRelevantArticlesToSelected } from '../../../redux/reducers/IrrelevantArticlesSlice'
import IrRelevantArticlesDropDownSection from './IrRelevantArticlesDropDownSection'

export function IrrelevantArticlesSection() {

    const [currentPageArticlesRefIdArr, setcurrentPageArticlesRefIdArr] = useState<string[]>([])

    const dispatch = useAppDispatch()
    const { selectedArticles } = useAppSelector((state) => state.irRelevantArticlesDetails)    

    useEffect(() => {
        const refIdTakeOfThisPageArticlesHandler = () => { // this functions articlesRefIdArr is used for the select all and deselect articles option      
            let articlesRefIdArr: any = []
            IrrelevantArticles["data"].forEach((article: any) => {
                articlesRefIdArr.push(article.refId)
            });
            setcurrentPageArticlesRefIdArr(articlesRefIdArr)            
        }        
        refIdTakeOfThisPageArticlesHandler()
    }, [])

    const [articlesExpand, setarticlesExpand] = useState<boolean>(false);

    const articlesExpandHandler = () => setarticlesExpand(prevVal => !prevVal); // it helps to exand all articles while the user clicks the expand btn!!!    

    const articleSelectHandler = (val: string) => { // helps to select the articles by the user          
        if (selectedArticles.includes(val)) {
          const notValArr = selectedArticles.filter(
            (each) => each !== val
          );
          dispatch(addIrRelevantArticlesToSelected(notValArr))
        } else dispatch(addIrRelevantArticlesToSelected([
          ...selectedArticles,
          val
        ]))
      };

    // select all articles logics

    const requiredRefIdArrMakeHandler = () => {        
        let refIdArr: string[] = []
        selectedArticles.forEach((refId: string) => {
            let refIdIndex = currentPageArticlesRefIdArr.indexOf(refId)
            if (refIdIndex === -1) refIdArr.push(refId);
        })
        return refIdArr
    }

    const selectAllArticlesHandler = (mode: string) => {
        if (mode === "selectAll") {
            const refIdArr = requiredRefIdArrMakeHandler()
            dispatch(addIrRelevantArticlesToSelected(refIdArr.concat(currentPageArticlesRefIdArr)))
        }
        else {
            const refIdArr = requiredRefIdArrMakeHandler()
            dispatch(addIrRelevantArticlesToSelected(refIdArr))
        }
    }

    const allArticlesSelectedStatus = () => {  //to give true or false to the allArticlesSelected prop 
        let matchRefIdCount: number = 0
        selectedArticles.forEach((refId: any) => {
            let refIdIndex = currentPageArticlesRefIdArr.indexOf(refId)
            if (refIdIndex > -1) matchRefIdCount++
        });
        if ((currentPageArticlesRefIdArr.length > 0) && (matchRefIdCount === currentPageArticlesRefIdArr.length)) return true
        else return false
    }

    return (
        <>
            <div className='mar-t-15 has-green-border-bottom d-flex align-items-center justify-content-between'>
                <div className="d-flex align-items-center justify-content-start">
                    <SelectAllArticleCircleUI selectAllArticlesHandler={selectAllArticlesHandler} allArticlesSelected={allArticlesSelectedStatus()} />
                    <ArticleViewButtonSection
                        articlesExpandHandler={articlesExpandHandler}
                        expandBtnShow={false}
                    />
                </div>
                <div className="d-flex align-items-center justify-content-end">
                    <IrRelevantArticlesDropDownSection />
                </div>
            </div>
            <IrrelevantArticlesLists articlesExpand={articlesExpand} articles={IrrelevantArticles["data"]} articleSelectHandler={articleSelectHandler}/>
        </>
    )
}
