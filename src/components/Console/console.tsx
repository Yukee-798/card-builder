import { IBaseProps } from '../../types';
import { Form, Input, Button, Drawer, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons';

import './console.scss'
import { fileHelper } from '../../utils';
import { assetsPath } from '../../assets';


interface IConsoleProps extends IBaseProps {
    isPop?: boolean;
    onClose?: () => void;

}


interface IFile {
    name: string;
    path: string;
    size: number;
    type: string;
    uid: string;
    webkitRelativePath: string;
}

const Console: React.FC<IConsoleProps> = (props) => {

    const {
        isPop,
        onClose
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
                    maxCount={3}
                    customRequest={async ({ action, file, method, data, filename, headers, onProgress }) => {
                        const fileInfo: IFile = file as any;
                        const res = await fileHelper.readFile(fileInfo.path)

                        try {
                            fileHelper.writeFile('/Users/yukee-798/Downloads/daily/Electron_Project/card-builder/src/assets/'+ fileInfo.name, res);

                        } catch (err) {
                            console.log(err);
                        }

                    }}
                    // action='/Users/yukee-798/Downloads/daily/Electron_Project/card-builder/src/assets'
                    className='file-upload'
                    accept='.png,.jpg,.gif,.psd,.jpeg'
                >
                    <p className='upload-icon'>
                        <InboxOutlined />
                    </p>
                    <p className='upload-text'>
                        点击或将图片拖到该区域以上传
                </p>
                    <p className='upload-hint'>
                        注：请按照 <strong>照片</strong>、<strong>正面</strong>、<strong>背面</strong> 的顺序上传
                </p>
                </Upload.Dragger>
            </div>


            {/* <Button>test</Button> */}
        </Drawer>
    )
}

export default Console;