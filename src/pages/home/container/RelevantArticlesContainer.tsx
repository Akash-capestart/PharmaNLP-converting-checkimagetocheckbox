import React from "react";
import { RelevantArticlesSection } from "../components/RelevantArticlesSection";

export function RelevantArticlesContainer({ innerHeight }: { innerHeight: number }) {
  return (
    <RelevantArticlesSection innerHeight={innerHeight} />
  );
}
