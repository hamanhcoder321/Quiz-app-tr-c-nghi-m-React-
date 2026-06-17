import React from 'react'

const Results = () => {
  return (
    <div>
      <h2>Kết quả</h2>
      <p className="result">Bạn đã trả lời đúng 2/10 câu </p>
      <div className="resultButtonsContainer">
        <button className="result-button">Xem lại</button>
        <button className="result-button">Làm lại</button>
      </div>
    </div>
  )
}

export default Results