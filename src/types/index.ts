import React from "react";

export interface IBaseProps {
    className?: string;
    style?: React.CSSProperties;
    
}


export interface IFile {
    name: string;
    path: string;
    size: number;
    type: string;
    uid: string;
    webkitRelativePath: string;
}

