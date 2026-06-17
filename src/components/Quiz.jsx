import React, { useEffect, useState } from "react"; // thư viện react
import Results from "./Results";

// khi tạo một Quiz thì phải tạo trước bộ câu hỏi và đáp án, nên sẽ tạo một biến quizdata trước và dạng array, bên trong là nhiều object sẽ đại diện cho một bộ câu hỏi trong quiz: question là nội dung câu hỏi + option: các đáp án chọn + answer: kết quả 

const quizData = [
  {
    question: "Biến nào sau đây là hợp lệ trong JavaScript?",
    options: ["1variable", "_variable", "var-name", "var name"],
    answer: "_variable",
  },
  {
    question:
      "Trong JavaScript, kiểu dữ liệu nào sau đây là kiểu dữ liệu nguyên thủy (primitive)?",
    options: ["object", "array", "string", "function"],
    answer: "string",
  },
  {
    question:
      "Thuật toán sắp xếp nào sau đây có độ phức tạp trung bình là O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Linear Sort"],
    answer: "Merge Sort",
  },
  {
    question: "Kết quả của `typeof null` trong JavaScript là gì?",
    options: ["'null'", "'undefined'", "'object'", "'number'"],
    answer: "'object'",
  },
  {
    question: "Bộ nhớ Stack dùng để làm gì?",
    options: [
      "Lưu trữ dữ liệu dạng hàng đợi",
      "Lưu trữ các lời gọi hàm (function calls)",
      "Lưu ảnh",
      "Lưu video",
    ],
    answer: "Lưu trữ các lời gọi hàm (function calls)",
  },
  {
    question: "Toán tử nào so sánh nghiêm ngặt giá trị và kiểu dữ liệu?",
    options: ["==", "===", "!=", "="],
    answer: "===",
  },
  {
    question: "JSON là viết tắt của gì?",
    options: [
      "Java Syntax Object Notation",
      "JavaScript Object Notation",
      "JavaScript Online Network",
      "Java Server Object Notation",
    ],
    answer: "JavaScript Object Notation",
  },
  {
    question:
      "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc FIFO (First In First Out)?",
    options: ["Stack", "Queue", "Array", "Linked List"],
    answer: "Queue",
  },
  {
    question: "Câu lệnh nào in ra nội dung trong console trình duyệt?",
    options: ["print()", "console.log()", "echo()", "show()"],
    answer: "console.log()",
  },
  {
    question: "Khi bạn viết `let x;` trong JavaScript, giá trị ban đầu của x là gì?",
    options: ["null", "0", "undefined", "false"],
    answer: "undefined",
  },
  {
    question: "HTML là gì?",
    options: [
      "Ngôn ngữ lập trình để xử lý logic",
      "Ngôn ngữ đánh dấu để tạo cấu trúc website",
      "Framework của JavaScript",
      "Trình duyệt web",
    ],
    answer: "Ngôn ngữ đánh dấu để tạo cấu trúc website",
  },
  {
    question: "Trong thuật toán, Big O dùng để đo gì?",
    options: [
      "Tốc độ mạng",
      "Thời gian load ảnh",
      "Độ phức tạp của thuật toán",
      "Dung lượng RAM máy tính",
    ],
    answer: "Độ phức tạp của thuật toán",
  },
];


// khi tạo hàm component nhớ viết chữ cái đầu lên để phân biệt hàm thường và hàm component

const Quiz = () => {

  // lưu ý quan trọng là chỉ return một ptu thôi. nếu return 2 cái thẻ div sẽ bị lỗi

  // nếu trong trường hợp có nhiều component ptu con thì phải bọc nó trong thẻ div cha

  // nếu tạo div cha vậy sẽ thừa lồng div vào nhau nên giải pháp đây là tạo một thẻ fragment cặp thẻ rỗng -> đối vs react mà thôi, còn js ko đc  



  // usetate trả về một mảng đúng 2 ptu option và setOption: cú pháp option là giá trị hiện tại state còn setOption là callback đổi giá trị state, cú pháp này gọi là array destructuring, tức là phân rã thành 2 biến riêng
  const [optionSelected, setOptionSelected] = useState();


  // tạo một mảng lưu chỉ số đáp án, ví dụ user click đáp án đầu tiên chúng ta lưu số 0 => trong mảng số 0 chỉ số item đầu tiên, mảng này dùng trong hậu trường lưu câu trả lời user nó ko hiện trên giao diện, dùng state vì cứ khi nào component render lại thì giá trị biến thường sẽ được reset lại mặc định, nếu rời biến ra ngoài thì component có render lại nó ko ảnh hưởng, nhưng ko nên đặt user  answer ở ngoài component vì lúc này nó thành global variable biến toàn cầu giá trị nó sẽ được dùng chung tất cả quiz component, tốt nhất lưu giá trị useranswer trong state vì state sẽ bảo lưu giá trị của dữ liệu, khi component render lại 
  
  const [userAnswers, setUserAnswers] 
  = useState(Array.from({length: quizData})); // giá trị mặc định state là arr.from({lenght: quizData}) nghĩa là mảng có chiều dài bằng số câu hỏi trong quiz 


  // tạo một biến lưu lại câu hỏi hiện tại. và state này sẽ có tên là currentQuestion + giá trị mặc định là 0 là câu hỏi đầu tiên trong mảng
  const [currentQuestion, setCurrentQuestion] = useState(0);



  // tạo một state quản lý isquizended, giá trị mặc định là false
  const [isQuizEnded, setIsQuizEnded] = useState(false);



  // let lưu biến đáp án đã chọn vào một biến  
  // let optionSelected = "abc";


  // hàm handleSelectOption => gọi lại nó ở trong onclick truyền lại option
  const handleSelectOption = (option, index) => {

    // update lại giá trị option ở đây nhưng khi click UI nó ko thay đổi vì html Dom ko cập nhật biến thường. nó chỉ cập nhật khi bạn thông báo cho nó có trạng thái thay đổi nghĩa là state, state là biến đặc biệt trong react để thông báo trạng thái giao diện khi state thay đổi thì react mới cập nhật UI còn biến thường react sẽ ko tự cập nhật, nếu muốn UI quiz phản ứng sự lựa chọn user thì phải dùng đến state để biến thường -> thành state khi đó UI nó sẽ cập nhật khi click đáp án 


    // để tạo state sẽ dùng react hook, về cơ bản hook là một cái móc để móc thêm tính năng đặc biệt vào component. một hook là usestate
    setOptionSelected(option);
    // optionSelected = option;

    // hiện tại current question bằng 0 mọi thứ giữ nguyên, nên tạo setCurrentQuestion(2) => nó sẽ chuyển sang câu tiếp theo
    // setCurrentQuestion(2);

    //người dùng chọn một đáp án thì mình muốn lưu câu trả lời đó vào đúng vị trí trong user answer, ví dụ: current question đang là 0 và user chọn đáp án đầu tiên thì mình muốn update mảng user answer thành thành[0, null, ...], vì useranswer là state, chúng ta ko thể trực tiếp sửa được giá trị của user, phải tạo mảng mới xong gán mảng mới trong set user answer, cho nên đầu tiên sẽ tạo mảng copy của mảng user answer, dùng spread operator copy mảng cũ sang => cập nhật đáp án mới vào, thay giá trị ở current question mà user đã chọn có nghĩa là option sau đó gọi set user answer bỏ cái mảng mới vào. nguyên tắc này rất quan trọng khi làm việc vs state là đối tượng hoặc là array trong react. bạn nhớ tạo bảng copy mới cập nhật thay đổi mới vào mảng copy rồi dùng set state để cập nhật state mới, thay vì lưu nguyên cái dáp án mình chỉ muốn lưu số thứ tự của đáp án thôi. cho nên cần tham số index truyền vào chỉ số của đáp án 
    const newUserAnswer = [...userAnswers];
    newUserAnswer[currentQuestion] = index;
    setCurrentQuestion[newUserAnswer]


  }

  // chức năng quan trọng cho dự án này đó là điều hướng. mục đích là cho phép user chuyển qua qua câu hỏi này sang câu hỏi khác, setCurrentQuestion 2 nút quay lại và kế tiếp, tạo 2 biến goNext và goBack

  const goNext = () => {
    // setCurrentQuestion(currentQuestion + 1);

    // dùng trực tiếp currentquestion trong setCurrentQuestion logic cái này đúng nhưng mà an toàn hơn thì sử dụng hàm arrowfunc có tham số là prev, return giá trị prev cộng 1 prev nghĩa là previous là giá trị cũ. và hàm call back truyền vào giá trị cũ currentquestion sau đó return giá trị mới prev + 1, nói chung logic tương đương với cái current question cộng 1

    // vì lý do stale state(nghĩa là giá trị cũ) nên dùng prev là hợp lý nhất, nếu 2 hàm bất đồng bộ chạy gần như cùng một lúc và lấy trị từ cùng một biến cùng một lúc trả về giá trị giốn nhau, mặc dù hàm set chạy trước đáng lẽ trả về số 2 và hàm set đến sau phải trả về số 2 hay 3, khi stale state xảy ra thì cả 2 đều return về số 2. khi dùng prev react sẽ luôn bảo đảm giá trị mới nhất và đúng khi update, còn nếu giá trị là mới ko liên qua gì tới giá trị của state cũ, ví dụ là một cái số mới là số 3 có thể viết thẳng vào luôn ko cần hàm mũi tên

    // setCurrentQuestion((prev) => prev + 1);


    // cập nhật lại giá trị của option selected. mỗi khi qua câu hỏi khác, logic bấm vào nút kế tiếp hay quay lại thì mình ktra xem câu này đã được trả lời chưa. vì chúng ta có giữ danh sách câu trả lời của người dùng cho nên check xem câu này đã được trả lời chưa, trả lời rồi thì option selected đổi thành đáp án người dùng trả lời. còn nếu chưa thì chúng ta reset lại option thành chuỗi rỗng

    // const answer = Number(userAnswers[currentQuestion +1]); // lấy đáp án người dùng đã chọn ở câu hỏi hiện tại và ép nó về theo kiểu số 

    // const pastOptionSelected = quizData[currentQuestion +1].options[answer]; // vào mảng quizdata lấy câu hỏi hiện tại sau đó truy cập mảng option và lấy ra option theo vị trí mà người dùng đã chọn  


    // điều kiện answer khác undefined nếu biến Answer có giá trị hợp lệ chúng ta sẽ gọi optionselected(pastoptionselected), ngược lại nếu chưa có đáp án reset setoptionselected("").
    // if(answer !== undefined ){
    //   setOptionSelected(pastOptionSelected);
    // }else{
    //   setOptionSelected("");
    // }

    // sau khi check và có điều kiện giá trị vẫn chưa reset lại, vấn đề ở chỗ sau khi setcurrentquestion, vì đây là hàm bất đồng bộ và chúng ta chưa ra khỏi hàm này. cho nên tại thời điểm chúng ta dùng giá trị của currentquestion thì vẫn mang giá trị cũ chưa được reset giá trị mới, cách fix là thêm 1 đơn vị ở current question => crrent question giá trị cũ + 1 nó sẽ tăng lên và thêm - 1 sẽ có giá trị đúng. 

    // ** (thêm + 1 ở chỗ biến answer và pastoptionselected ở hàm goNext), thêm - 1 ở hàm goBack tương tự


    // cập nhật isQuizEnded logic hàm goNext, đang ở câu hỏi cuối, thay vì tăng current question sẽ xét isquizended bằng (true) 
    if(currentQuestion === quizData.length - 1){
      setIsQuizEnded(true);
    }else{
      setCurrentQuestion((prev) => prev + 1);
    }

  }

  const goBack = () => {
    // cho phép nó lùi lại khi currentquestion lớn hơn 0
    if(currentQuestion > 0){
      setCurrentQuestion(prev => prev - 1);
    }

    // cập nhật lại giá trị của option selected. mỗi khi qua câu hỏi khác, logic bấm vào nút kế tiếp hay quay lại thì mình ktra xem câu này đã được trả lời chưa. vì chúng ta có giữ danh sách câu trả lời của người dùng cho nên check xem câu này đã được trả lời chưa, trả lời rồi thì option selected đổi thành đáp án người dùng trả lời. còn nếu chưa thì chúng ta reset lại option thành chuỗi rỗng

    // const answer = Number(userAnswers[currentQuestion -1]); // lấy đáp án người dùng đã chọn ở câu hỏi hiện tại và ép nó về theo kiểu số 

    // const pastOptionSelected = quizData[currentQuestion -1].options[answer]; // vào mảng quizdata lấy câu hỏi hiện tại sau đó truy cập mảng option và lấy ra option theo vị trí mà người dùng đã chọn 

    // điều kiện answer khác undefined nếu biến Answer có giá trị hợp lệ chúng ta sẽ gọi optionselected(pastoptionselected), ngược lại nếu chưa có đáp án reset setoptionselected("").
    // if (answer !== undefined) {
    //   setOptionSelected(pastOptionSelected);
    // } else {
    //   setOptionSelected("");
    // }
  }



  // ở đây logic đơn giản + 1 và - 1 bốn lần này cũng đúng, nhưng với logic phức tạp hơn và phải dùng giá trị của currentquestion nhiều hơn sẽ rất dễ gây ra lỗi mã nếu quên + 1 hoặc - 1 thì lỗi. cách fix ở đây dùng cái hook khác là useEffect có nhiệm vụ theo dõi sự thay đổi của một hay nhiều state hoăc props. khi nhận thấy sự thay đổi thì useEffect sẽ chạy phần logic bạn chỉ định, đúng với trường hợp muốn theo dõi giá trị của currentquestion nó thay đổi sẽ update lại optionselected tương ứng

  useEffect(() => {
    // cập nhật lại giá trị của option selected. mỗi khi qua câu hỏi khác, logic bấm vào nút kế tiếp hay quay lại thì mình ktra xem câu này đã được trả lời chưa. vì chúng ta có giữ danh sách câu trả lời của người dùng cho nên check xem câu này đã được trả lời chưa, trả lời rồi thì option selected đổi thành đáp án người dùng trả lời. còn nếu chưa thì chúng ta reset lại option thành chuỗi rỗng

    const answer = Number(userAnswers[currentQuestion]); // lấy đáp án người dùng đã chọn ở câu hỏi hiện tại và ép nó về theo kiểu số 

    const pastOptionSelected = quizData[currentQuestion].options[answer]; // vào mảng quizdata lấy câu hỏi hiện tại sau đó truy cập mảng option và lấy ra option theo vị trí mà người dùng đã chọn  


    // điều kiện answer khác undefined nếu biến Answer có giá trị hợp lệ chúng ta sẽ gọi optionselected(pastoptionselected), ngược lại nếu chưa có đáp án reset setoptionselected("").
    if (answer !== undefined) {
      setOptionSelected(pastOptionSelected);
    } else {
      setOptionSelected("");
    }
  }, [currentQuestion, userAnswers]) //khai báo state theo dõi là currentQuestion + userAnswers



  // nếu quiz kết thúc sẽ hiển thị kết quả. thay vì hiển thị giao diện bài quiz, điều kiện sẽ là if isQuizEnded return giao diện <Results/> import.
  if(isQuizEnded){
    return <Results/>;
  }


  return (
    <div>
      {/* câu hỏi đầu tiên */}
      {/* cộng thêm 1 cho currentquestion trong h2*/}
      <h2>Câu {currentQuestion + 1}</h2>


      {/* lấy câu hỏi ở quiz data là mảng object, và câu hỏi sẽ nằm trong ptu đầu tiên của mảng, nếu muốn chèn js vào jsx bọc code trong cặp dấu ngoặc nhọn để hiển thị  */}
      <p className="question">{quizData[currentQuestion].question}</p>


      {/* <button className="option">A</button> */}


      {/* ở đây dùng js để render tất cả các câu hỏi và đáp án, lấy câu hỏi đầu tiên rôi truy cập thuộc tính nó tức là danh sách các đáp án, dùng hàm map lặp qua các danh sách này tham số của hàm map là option và return jsx cho mỗi đáp án, để render các lựa chọn đáp khác nhau thay chữ A bằng biến option*/}

      {quizData[currentQuestion].options.map((option, index) => 
      // truyền thêm key, phân biệt nút này và nút kia, cứ dùng map react sẽ yêu cầu thuộc tính key
      <button 
      key={option}
      className={`option ${optionSelected === option ? "selected" : ""}`} 

      // ko cho người dùng chọn lại đáp án khi đã chọn, !! là giá trị boolean
      disabled={!!optionSelected && optionSelected !== option}


      // bắt buộc dùng hàm mũi tên (arrowfuc) để sự kiện click được render khi user click, vì nó khi load xong nó chạy luôn, còn ko cần tham số mình chỉ cần truyền hàm là xong, ko cần hàm mũi tên

      onClick={() => handleSelectOption(option, index)}>{option}</button>)}



      {/* kiểm tra đáp án chọn đúng ko */}
      {
        optionSelected ? (// sau khi điều kiện hàm goNext và goBack xong, thì vấn đề lỗi nó hiện câu trả lời chưa đúng, option selected reset lại thành chuỗi rỗng thì chuỗi rỗng ko = với giá trị đúng cho nên nó sẽ hiển thị là câu trả lời chưa đúng, thêm logic check nếu option selected bằng undefined hay là chuỗi thì nó  ko hiển thị gì hết, nếu optionselected là giá trị truthy chúng ta xem xét hiển thị thẻ P còn ko thì hiển thị chuỗi rỗng 

          // {/* truyền biến optionSelected xuống đây, ==== so sánh tuyệt đối */}

          optionSelected === quizData[currentQuestion].answer ? (
            <p className="correct-answer">Câu trả lời bạn đúng</p>
          ) : (
            <p className="incorrect-answer">Câu trả lời bạn chưa đúng</p>
          )): ("")
      }


      {/* thêm các nút giúp chuyển qua câu hỏi trc và câu tiếp theo */}
      <div className="nav-buttons">
        <button onClick={goBack} disabled={currentQuestion === 0}>Quay Lại</button>
        <button onClick={goNext} disabled={!optionSelected}>{currentQuestion === quizData.length - 1 ? "Bạn Đã Hoàn Thành Quiz" : "Kế tiếp"}</button>
      </div>


      {/* khái niệm state: lưu và thay đổi dữ liệu bên trong component, từ đó làm cho UI tự động cập nhật mỗi khi dữ liệu thay đổi */}



    </div>
  )
}

// xuất ra để các file khác dùng được
export default Quiz;