// app.js -> index.js -> index.html
import avatar from './images/bozai.png'
import './App.scss'
import { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

// comments list
const defaultList = [
  {
    rpid: 3,
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    content: '哎哟，不错哦',
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 77,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
  },
]

// current user
const user = {
  uid: '30009257',
  avatar,
  uname: '黑马前端',
}

// tabs
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]


const App = () => {

  const [commentsLst, setCommentsLst] = useState(defaultList)

  const handleDel = (rpid) => {
    setCommentsLst(commentsLst.filter(item => (item.rpid !== rpid)))
  }


  const [type, setType] = useState('hot')
  const handleTabChange = (type) => {
    setType(type)
    if ('hot' === type) {
      setCommentsLst(_.orderBy(commentsLst, 'like', 'desc'))
    } else {
      setCommentsLst(_.orderBy(commentsLst, 'ctime', 'desc'))
    }
  }


  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}

            {tabs.map(item => (
              <span
                key={item.type}
                // className={`nav-item ${item.type === type && 'active'}`}
                className={ classNames('nav-item', { active: item.type === type }) }
                onClick={() => handleTabChange(item.type)}
              >
                {item.text}</span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {commentsLst.map(item => (
            <div className="reply-item">
              {/* 头像 */}
              <div key={item.rpid} className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    alt=""
                  />
                </div>
              </div>

              <div className="content-wrap">
                {/* 用户名 */}
                <div className="user-info">
                  <div className="user-name">{item.user.uname}</div>
                </div>
                {/* 评论内容 */}
                <div className="root-reply">
                  <span className="reply-content">{item.content}</span>
                  <div className="reply-info">
                    {/* 评论时间 */}
                    <span className="reply-time">{item.ctime}</span>
                    {/* 评论数量 */}
                    <span className="reply-time">点赞数:{item.like}</span>

                    {item.user.uid === user.uid &&
                      <span
                        className="delete-btn"
                        onClick={() => handleDel(item.rpid)}
                      >
                        删除
                      </span>
                    }


                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* 评论项 */}

        </div>
      </div>
    </div>
  )
}

export default App;


