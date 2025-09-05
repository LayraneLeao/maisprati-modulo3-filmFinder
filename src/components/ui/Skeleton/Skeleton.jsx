import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Skeleton.module.css";

function Skeleton({ className, ...props }) {
  return (
    <div 
      className={cn(styles.skeleton, className)} 
      {...props} 
    />
  );
}

export { Skeleton };