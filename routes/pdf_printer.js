const PDFDocument = require('pdfkit');
const fs = require('fs');
class Printer {
    // Função para gerar a fatura
 gerarFatura(fatura) {
    // Cria um novo documento PDF
    const doc = new PDFDocument();
  
    // Define o caminho e o nome do arquivo de saída
    const outputFilename = './uploads/fatura.pdf';
  
    // Cabeçalho da fatura
    doc.fontSize(18).text('Fatura', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Número da Fatura: ${fatura.numero}`);
    doc.fontSize(12).text(`Data: ${fatura.data}`);
    doc.moveDown();
  
    // Tabela de itens da fatura
    const table = {
      headers: ['Descrição', 'Quantidade', 'Preço Unitário', 'Total'],
      rows: []
    };
  
    fatura.itens.forEach(item => {
      const row = [
        item.descricao,
        item.quantidade.toString(),
        this.formatarValor(item.precoUnitario),
        this.formatarValor(item.total)
      ];
      table.rows.push(row);
    });
  
    const tableTop = doc.y + 30; // Ajuste a altura superior da tabela
    const tableBottom = doc.y + 30 + table.rows.length * 20;
    const tableWidth = 470;
    const tableHeight = tableBottom - tableTop;
    const columnCount = table.headers.length;
    const columnWidth = tableWidth / columnCount;
    const rowHeight = 20;
  
    // Centraliza a tabela horizontalmente
    const tableLeft = (doc.page.width - tableWidth) / 2;
    const tableRight = tableLeft + tableWidth;
  
    doc.font('Helvetica-Bold');
    doc.fontSize(10);
  
    // Cabeçalho da tabela
    table.headers.forEach((header, i) => {
      doc.fillColor('black').text(header, tableLeft + i * columnWidth, tableTop, {
        width: columnWidth,
        align: 'center'
      });
    });
  
    doc.moveDown();
  
    // Conteúdo da tabela
    doc.font('Helvetica');
    doc.fontSize(10);
    table.rows.forEach((row, i) => {
      const y = tableTop + (i + 1) * rowHeight;
      row.forEach((cell, j) => {
        doc.fillColor('black').text(cell, tableLeft + j * columnWidth, y, {
          width: columnWidth,
          align: 'center'
        });
      });
    });
  
    doc.moveDown();
  
    // Total da fatura
    doc.fontSize(12).text(`Total: ${this.formatarValor(fatura.total)}`, { align: 'right' });
  
    // Salva o PDF no disco
    doc.pipe(fs.createWriteStream(outputFilename));
    doc.end();
  
    console.log(`A fatura foi gerada com sucesso no arquivo ${outputFilename}.`);
  }
  
  // Função para formatar valores monetários
   formatarValor(valor) {
    return 'Kz ' + valor.toFixed(2);
  }
  
  }
  
  module.exports = Printer;