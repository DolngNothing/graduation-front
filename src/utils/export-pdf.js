import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import $ from 'jquery'

export function getPdf(title, id) {
  const Dom_height = $('#' + id).height() // 获取要截取的dom元素内容高度
  const outer_height = $('#' + id).outerHeight() // 获取dom元素的外部高度
  const window_height = window.screen.availHeight // 窗口高度

  html2Canvas(document.querySelector('#' + id), {
    allowTaint: true,
    height: Dom_height < window_height ? window_height : outer_height, // canvas画布的具体高度
    /* 以上这个高度非常重要，如果dom内容高度在窗口高度内的话，那就用窗口高度，
        确保把当前页的内容都截取，如果超过一页，那就用外部高度*/
    windowHeight: document.getElementById(id).scrollHeight,
    y: window.pageYOffset // 页面在垂直方向的滚动距离
  }).then(function(canvas) {
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    const pageHeight = contentWidth / 592.28 * 841.89
    let leftHeight = contentHeight
    let position = 0
    const imgWidth = 595.28
    const imgHeight = 592.28 / contentWidth * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const PDF = new JsPDF('', 'pt', 'a4')
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    PDF.save(title + '.pdf')
  }
  )
}

