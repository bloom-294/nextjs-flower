import style from "../../src/styles/calendar.module.css"

export const Calendar = () => {

  return (
    <>
      <div className="mt-5">
        <div className="flex flex-nowrap justify-center items-center m-auto">
          <button>
            <span className="material-symbols-outlined text-sm mx-2">
              arrow_back_ios
            </span>
          </button>
          <h3>2022年10月</h3>
          <button>
            <span className="material-symbols-outlined text-sm mx-2">
              arrow_forward_ios
            </span>
          </button>
        </div>
        <table className={`m-auto  ${style.calendar}`}>
          <thead>
            <tr >
              <th className="text-red-700 ">日</th>
              <th className="">月</th>
              <th className="">火</th>
              <th className="">水</th>
              <th className="">木</th>
              <th className="">金</th>
              <th className="text-blue-700 ">土</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className=" text-red-700">&nbsp;1</td>
              <td className="">&nbsp;2</td>
              <td className="">&nbsp;3</td>
              <td className="">&nbsp;4</td>
              <td className="">&nbsp;5</td>
              <td className="">&nbsp;6</td>
              <td className=" text-blue-700">&nbsp;7</td>
            </tr>
            <tr>
              <td className=" text-red-700">&nbsp;8</td>
              <td className="">&nbsp;9</td>
              <td className="">10</td>
              <td className="">11</td>
              <td className="">12</td>
              <td className="">13</td>
              <td className=" text-blue-700">14</td>
            </tr>
            <tr>
              <td className=" text-red-700">15</td>
              <td className="">16</td>
              <td className="">17</td>
              <td className="">18</td>
              <td className="">19</td>
              <td className="">20</td>
              <td className=" text-blue-700">21</td>
            </tr>
            <tr>
              <td className=" text-red-700">22</td>
              <td className="">23</td>
              <td className="">24</td>
              <td className="">25</td>
              <td className="">26</td>
              <td className="">27</td>
              <td className=" text-blue-700">28</td>
            </tr>
            <tr>
              <td className=" text-red-700">29</td>
              <td className=" ">30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
