import { IBaseProps } from '../../types';
import { Image, Input } from 'antd'
import Pic from '../../assets/pic.jpg';
import './displayer.scss'


interface IDisplayerProps extends IBaseProps {

}


const Displayer: React.FC<IDisplayerProps> = (props) => {
    return (
        <div
            className='displayer-warp'
        >
            <div className='displayer-front'>

                <div className='hint'>正面</div>
                <div
                    className='background'
                >

                    {/* <Image src={Pic}/> */}

                </div>



                <div
                    className='owner-photo'
                >

                </div>



                <div
                    className='owner-info'
                >
                    <div>
                        <div className='lable'>
                            {/* <span><span>姓</span>名</span>: */}
                            <span>姓</span>
                            <span>名:</span>
                        </div>

                        <Input bordered={false} />
                    </div>
                    <div>
                        <div className='lable'>
                            <span>ID</span>
                            <span>号:</span>
                            {/* <span><span>ID</span>号</span>: */}
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
                            {/* <span><span>专</span>业</span>: */}
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

            <div className='displayer-back'>
                <div className='hint'>背面</div>
            </div>
        </div>
    )
}

export default Displayer;