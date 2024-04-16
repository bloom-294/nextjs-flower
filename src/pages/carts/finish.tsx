import style from "../../styles/finishPhrase.module.css";


const App = () => {

  return (
    <>
      {/* <Loader /> */}

      <div className={`container flex flex-col justify-center items-center mx-auto py-5 px-5  ${style.phraseGroup} `}>
        <h1 className={`${style.phraseBounce}  text-bold text-xl`}>
          ご注文ありがとうございます！
        </h1>
        <div className="mt-6">
          <p>
            この度はご購入ありがとうございました。
          </p>
          <p>
            注文情報につきましては、メールにてお送りいたします。
          </p>
        </div>
      </div>

    </>
  )
}

export default App
