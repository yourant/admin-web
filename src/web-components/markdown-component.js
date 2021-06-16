class MarkdownComponent extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({ mode: "closed" });

    const baseStyle = document.createElement("style");
    baseStyle.innerHTML = `
      :host {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
      }
    `;
    shadow.appendChild(baseStyle);

    const style = document.createElement("style");
    style.innerHTML = `<slot name="style"></slot>`;
    shadow.appendChild(style);

    const container = document.createElement("div");
    container.innerHTML = `<slot name="content"></slot>`;
    shadow.appendChild(container);

    // 加载 flowchart 图表
    const flowchartScript = document.createElement("script");
    flowchartScript.innerHTML = `
      const flowchartDoms = document.querySelectorAll('.md-flowchart')

      if (flowchartDoms.length > 0) {
        let raphaelLoad = false, flowchartLoad = false

        function scriptLoad() {
          flowchartDoms.forEach(element => {
            try {
              let code = element.textContent
              let chart = flowchart.parse(code)
              element.textContent = ''
              chart.drawSVG(element)
            } catch (e) {
              throw e
              element.outerHTML = '<pre>flowchart 解析失败了: ' + e + '</pre>'
            }
          })
        }

        const raphaelScript = document.createElement("script")
        raphaelScript.onload = () => {
          raphaelLoad = true
          if (flowchartLoad) scriptLoad()
        }
        raphaelScript.src = 'http://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js'
        document.body.appendChild(raphaelScript)
        
        const flowchartScript = document.createElement("script")
        flowchartScript.onload = () => {
          flowchartLoad = true
          if (raphaelLoad) scriptLoad()
        }
        flowchartScript.src = 'https://cdn.tutorialjinni.com/flowchart/1.14.1/flowchart.min.js'
        document.body.appendChild(flowchartScript)
      }
    `;
    shadow.appendChild(flowchartScript);

    // 加载 echarts 图表
    const echartsScript = document.createElement("script");
    echartsScript.innerHTML = `
      const echartDoms = document.querySelectorAll('.md-echarts')

      if (echartDoms.length > 0) {
        const echartsScript = document.createElement("script")
        echartsScript.onload = () => {
          echartDoms.forEach(element => {
            try {
              let options = JSON.parse(element.textContent)
              let chart = echarts.init(element)
              chart.setOption(options)
            } catch (e) {
              element.outerHTML = '<pre>echarts 图表解析失败了: ' + e + '</pre>'
            }
          })
        }
        echartsScript.src = 'https://lib.baomitu.com/echarts/5.1.2/echarts.min.js'
        document.body.appendChild(echartsScript)
      }
    `;
    shadow.appendChild(echartsScript);
  }
}
window.customElements.define("markdown-component", MarkdownComponent);
