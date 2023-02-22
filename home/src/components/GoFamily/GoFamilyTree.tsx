import React from "react";

export default function GoFamilyTree() {
  return (
    <>
      <div id="familyDiagram" className="chart"></div>
      <form id="form1" action="" method="post" className="hidden">
        <p>
          <div>姓名：</div>
          <input type="text" value="陳〇〇" name="name" />
        </p>
        <p>
          <div>出生日期：</div>
          <input type="text" value="2010-10-31" name="birthday" />
        </p>
        <p>
          <div>性別：</div>
          <select name="gender">
            <option value="M">男性</option>
            <option value="F" selected>
              女性
            </option>
          </select>
        </p>
        <p>
          <div>關係：</div>
          <select name="relation">
            <option value="">兒女</option>
          </select>
        </p>
        <p>
          <input type="submit" value="送出" />
        </p>
      </form>
    </>
  );
}

