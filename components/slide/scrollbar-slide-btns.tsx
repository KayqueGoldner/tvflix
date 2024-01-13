import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { PropsWithChildren } from "react";

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="w-max h-max p-2 bg-outline hover:bg-darkRed disabled:opacity-50 disabled:pointer-events-none rounded-[6px] transition ease-out duration-150"
      {...restProps}
    >
      <ArrowLeft
        className="h-4 w-4 text-white"
      />
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="w-max h-max p-2 bg-outline hover:bg-darkRed disabled:opacity-50 disabled:pointer-events-none rounded-[6px] transition ease-out duration-150"
      {...restProps}
    >
      <ArrowRight
        className="h-4 w-4 text-white"
      />
    </button>
  )
}
