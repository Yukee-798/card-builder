import { IBaseProps, IFile } from '../../types';
import { Button, Drawer, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import './console.scss'

interface IConsoleProps extends IBaseProps {
    isPop?: boolean;
    onClose?: () => void;
    onFileUpload?: (file: IFile) => void;
    onRemake?: () => void;
    onCreate?: () => void;
}

const Console: React.FC<IConsoleProps> = (props) => {

    const {
        isPop,
        onClose,
        onFileUpload,
        onCreate,
        onRemake
    } = props;
    return (
        <Drawer
            title='操作台'
            className='console'
            visible={isPop}
            onClose={onClose}
        >
            <div>
                <Upload.Dragger
                    maxCount={2}
                    customRequest={async ({ file }) => {
                        console.log('文件上传');
                        onFileUpload?.(file as unknown as IFile);
                    }}
                    className='file-upload'
                    accept='.png,.jpg,.gif,.psd,.jpeg'
                    itemRender={() => <></>}
                >
                    <p className='upload-icon'>
                        <InboxOutlined />
                    </p>
                    <p className='upload-text'>
                        点击或将图片拖到该区域以上传
                    </p>
                    <p className='upload-hint'>
                        注：请按照 <strong>照片</strong>、<strong>正面</strong> 的顺序上传
                    </p>
                </Upload.Dragger>
            </div>


            <Button
                className='console-btn'
                onClick={() => {
                    onRemake?.();
                }}
            >
                重制
            </Button>
            <Button
                className='console-btn'
                type='primary'
                onClick={() => {
                    onCreate?.();
                }}
            >
                生成
            </Button>
        </Drawer>
    )
}

export default Console;