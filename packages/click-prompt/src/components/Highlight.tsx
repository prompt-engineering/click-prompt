import React from "react";

/**
 * Hight light keywords in paragraph
 */
export default function Highlight({ value, keyword }: { value: string; keyword: string }) {
  if (!(value != undefined && keyword != undefined && value.length > 0 && keyword.length > 0)) {
    return value;
  }
  const regex = new RegExp(keyword, "gi");

  return value
    .split(regex)
    .reduce((acc: any, part: string, i: number) => {
      if (i === 0) {
        return [part];
      }
      return acc.concat(
        <mark key={i} className='bg-yellow-300'>
          {keyword}
        </mark>,
        part,
      );
    }, [])
    .map((part: React.ReactNode, i: number) => <React.Fragment key={i}>{part}</React.Fragment>);
}
