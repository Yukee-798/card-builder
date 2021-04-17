import React ,{ useState } from 'react';
import { Row, Col, Button } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons';
import Displayer from './components/Displayer/displayer';
import Console from './components/Console/console';
import domtoimage from 'dom-to-image';
import { IFile } from './types';
import { saveAs } from 'file-saver';
import './App.scss';

const { ipcRenderer } = window.require('electron');

function App() {

  const [isPopConsole, setIsPopConsole] = useState(false);
  const [picList, setPicList] = useState<Pick<IFile, 'name' | 'path'>[]>([]);

  return (
    <div className="App">
      <Row>
        <Col span={24}>
          <Displayer
            loadPic={picList}
          />
          <Console
            isPop={isPopConsole}
            onClose={() => {
              setIsPopConsole(false);
            }}
            onRemake={() => {
              ipcRenderer.send('remake', JSON.stringify(picList));
              setPicList([]);
            }}

            onCreate={() => {
              if (picList.length < 2) {
                window.alert('请上传完整的图片数量！')
              } else {
                domtoimage.toBlob(window.document.getElementById('target-img') as any)
                  .then(function (blob) {
                    saveAs(blob, 'my_card.png');
                  });
              }
            }}

            // 当文件数量达到2个后，继续上传文件不会再执行回调
            onFileUpload={(file) => {

              const mFile = {
                path: file.path,
                name: file.name
              }

              if (picList.length < 2)
                setPicList(pre => {
                  ipcRenderer.send('cacheFile', JSON.stringify({
                    picList,
                    file: mFile
                  }));
                  return [...pre, mFile]
                });

            }}


          />
          <Button
            className='float-btn'
            icon={<MenuFoldOutlined />}
            onClick={() => {
              setIsPopConsole(true);
            }}
          >
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
