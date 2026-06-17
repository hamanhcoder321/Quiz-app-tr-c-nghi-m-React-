import React from 'react'


// để truyền các đáp và số câu trả lời đúng => dùng prop(properties) truyền dữ liệu từ quiz sang result => cha sang con

// **lưu ý**: prop là luôn object, truyền 2 đến 3 thứ gì đó bên component cha bên component con sẽ gom hết vào object và truyền vào tham số đầu tiên trong hàm component, tham số chứa prop bạn đặt tên gì cũng được, miễn hiểu nó là prop. lưu ý là prop được phân rã trực tiếp trong phần tham số của hàm bạn thấy rõ là trong prop này chứa những gì. nên prop này phân rã thành score và totalQuestionNum thay vì prop
const Results = ({score, totalQuestionNum, restartQuiz, rewatchQuiz}) => {
  return (
    <div>
      <h2>Kết quả</h2>
      <p className="result">Bạn đã trả lời đúng {score}/{totalQuestionNum} câu </p>
      <div className="resultButtonsContainer">
        <button className="result-button" onClick={rewatchQuiz}>Xem lại</button>
        <button className="result-button" onClick={restartQuiz}>Làm lại</button>
      </div>
    </div>
  )
}

export default Results