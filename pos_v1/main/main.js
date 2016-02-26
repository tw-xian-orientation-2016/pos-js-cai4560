//TODO: Please write code in this file.
function printReceipt(inputs) {
  var barcodeList = loadAllBarcodes(inputs);
  var cartItem = marchBarcodeList(barcodeList);
  var receiptItem = calculatePromotion(cartItem);
  console.log(getReceipt(receiptItem));
}

/*     Task1     */
function loadAllBarcodes(tags) {
  var barcodeList = [];
  //tags.sort();
  for(var start = 0; start < tags.length; start++) {
      var dividedBarcode = tags[start].split('-');
			var barcode = dividedBarcode[0];
			var end = searchEnd(tags, start);
			var number = parseFloat(dividedBarcode[1] || end - start);
			start = end - 1;
			barcodeList.push({ barcode: barcode, number: number });
    }
  return barcodeList;
}

function searchEnd(tags, start) {
  for(var end = start; end < tags.length; end++) {
    if(tags[end] === tags[start])
      continue;
    else
      break;
  }
  return end;
}

/*     Task2     */
function marchBarcodeList(barcodeList) {
  var cartItem = [];
  var items = loadAllItems();
  for(var i = 0; i < barcodeList.length; i++)
    for(var j = 0; j < items.length; j++) {
      if(barcodeList[i].barcode === items[j].barcode)
        cartItem.push(copyItemData(barcodeList[i],items[j]))
    }
  return cartItem;
}

function copyItemData(barcodeinfo, iteminfo)
{
  return { item: { barcode: iteminfo.barcode,
                   name: iteminfo.name,
                   unit: iteminfo.unit,
                   price: iteminfo.price },
           number: barcodeinfo.number };
}

/*     Task3     */
function calculatePromotion(inputs) {
  var result = [];
  var promotions = loadPromotions();
  for(var i=0; i<inputs.length; i++)
  {
    var flag = 0;
    for(var j=0; j<promotions.length;j++)
      for(var k=0; k<promotions[j].barcodes.length; k++)
        if(inputs[i].item.barcode === promotions[j].barcodes[k])
        {
          result.push(calculateTotalPrice(inputs[i]));
          flag = 1;break;
        }
    if(!flag)
      result.push({cartitem:inputs[i],
                   total:inputs[i].item.price*inputs[i].number,
                   save:0.00})
  }
  return result;
}

function calculateTotalPrice(input) {
  var promote = parseInt(input.number/3);
  return {cartitem:input,
          total:input.item.price*(input.number-promote),
          save:input.item.price*promote};
}

function getReceipt(inputs) {
  var receipt = "***<没钱赚商店>收据***\n";
  var totalprice = 0, totalsave = 0;
  for(var i=0; i<inputs.length; i++)
  {
    receipt += "名称：" + inputs[i].cartitem.item.name
            + "，数量：" + inputs[i].cartitem.number
            + inputs[i].cartitem.item.unit + "，单价："
            + inputs[i].cartitem.item.price.toFixed(2) + "(元)，小计："
            + inputs[i].total.toFixed(2) + "(元)\n";
    totalprice += inputs[i].total;
    totalsave  += inputs[i].save;
  }
  receipt += "----------------------\n";
  receipt += "总计："+totalprice.toFixed(2)+"(元)\n";
  receipt += "节省："+totalsave.toFixed(2)+"(元)\n";
  receipt += "**********************";
  console.log(receipt);
}
