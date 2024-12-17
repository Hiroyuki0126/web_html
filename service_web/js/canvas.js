// 椅子配置をCanvasに描画（人数と行×列に対応）
function drawArrangement(rows, cols, totalChairs) {
    const canvas = document.getElementById("simulationCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
  
    const chairSize = 30; // 椅子のサイズ
    const padding = 10; // 椅子間のスペース
    const startX = 50; // 描画開始位置
    const startY = 50;
  
    let chairsLeft = totalChairs; // 配置すべき椅子の残数
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // 残りの椅子が0なら配置を終了
        if (chairsLeft <= 0) break;
  
        // 最後の行で余りが出た場合、両端から椅子を減らす
        if (i === rows - 1 && chairsLeft < cols) {
          const offset = Math.floor((cols - chairsLeft) / 2); // 両端の余白を計算
          if (j < offset || j >= offset + chairsLeft) continue; // 両端をスキップ
        }
  
        const x = startX + j * (chairSize + padding);
        const y = startY + i * (chairSize + padding);
  
        // 椅子を描画
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, chairSize, chairSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, chairSize, chairSize);
  
        chairsLeft--; // 残数を減らす
      }
    }
  }
  
  // 入力変更時にシミュレーションを更新
  function updateSimulation() {
    const numberOfRows = document.getElementById("numberOfRows").value;
    const numberOfColumns = document.getElementById("numberOfColumns").value;
    const numberOfPeople = document.getElementById("numberOfPeople").value;
  
    if (!numberOfRows || !numberOfColumns || !numberOfPeople) {
      return; // 入力が揃っていない場合は更新しない
    }
  
    drawArrangement(
      parseInt(numberOfRows),
      parseInt(numberOfColumns),
      parseInt(numberOfPeople)
    );
  }
  
  // DOMが読み込まれたらリスナーを設定
  document.addEventListener("DOMContentLoaded", () => {
    const numberOfRowsInput = document.getElementById("numberOfRows");
    const numberOfColumnsInput = document.getElementById("numberOfColumns");
    const numberOfPeopleInput = document.getElementById("numberOfPeople");
    const arrangementPatternInputs = document.querySelectorAll(
      'input[name="arrangementPattern"]'
    );
  
    // 入力変更時にシミュレーションを更新
    numberOfRowsInput.addEventListener("input", updateSimulation);
    numberOfColumnsInput.addEventListener("input", updateSimulation);
    numberOfPeopleInput.addEventListener("input", updateSimulation);
    arrangementPatternInputs.forEach((input) =>
      input.addEventListener("change", updateSimulation)
    );
  });
  