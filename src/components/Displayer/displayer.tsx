import React, { useEffect } from 'react';
import { IBaseProps, IFile } from '../../types';
import { Image, Input } from 'antd'
import './displayer.scss'

interface IDisplayerProps extends IBaseProps {
    loadPic: Pick<IFile, 'name' | 'path'>[]
}


const Displayer: React.FC<IDisplayerProps> = (props) => {
    const { loadPic } = props;

    useEffect(() => {
        console.log(loadPic[0]?.path && 'file://' + loadPic[0]?.path);
    }, [loadPic])


    return (
        <div
            className='displayer-warp'
        >
            <div className='displayer-front' id='target-img'>

                <div className='owner-photo'>
                    <Image
                        src={loadPic[0] ? 'file://' + loadPic[0]?.path : undefined}
                        preview={false}
    
                    />
                </div>


                <div className='hint'>背景</div>
                <div className='background'>
                    <Image
                        src={loadPic[1] ? 'file://' + loadPic[1]?.path : undefined}
                        preview={false}
                    />
                </div>



                <div
                    className='owner-info'
                >
                    <div>
                        <div className='lable'>
                            <span>姓</span>
                            <span>名:</span>
                        </div>

                        <Input bordered={false} />
                    </div>
                    <div>
                        <div className='lable'>
                            <span>ID</span>
                            <span>号:</span>
                        </div>

                        <Input bordered={false} />
                    </div>
                    <div>
                        <div className='lable'>
                            <span>学</span>
                            <span>院:</span>
                        </div>

                        <Input bordered={false} />
                    </div>
                    <div>
                        <div className='lable'>
                            <span>专</span>
                            <span>业:</span>
                        </div>

                        <Input bordered={false} />
                    </div>
                    <div>
                        <div className='lable'>
                            <span>发卡日期</span>:
                        </div>

                        <Input bordered={false} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Displayer;