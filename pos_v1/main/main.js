//TODO: Please write code in this file.
function printReceipt(receiptItem) {
  var barcodeList = loadAllBarcodes(receiptItem);
  var cartItem = marchBarcodeList(barcodeList);
  var receiptItem = calculatePromotion(cartItem);
  console.log(getReceipt(receiptItem));
}

/*     Task1     */
function loadAllBarcodes(tags) {
  var barcodeList = [];
  //tags.sort();
  for(var start = 0; start < tags.length; ) {
      var dividedBarcode = tags[start].split('-');
			var barcode = dividedBarcode[0];
			var end = searchEnd(tags, start);
			var number = parseFloat(dividedBarcode[1] || end - start);
			start = end ;
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
function calculatePromotion(cartItem) {
  var receiptItem = [];
  var promotions = loadPromotions();
  for(var i = 0; i < cartItem.length; i++) {
    var promoteNumber = isPromote(cartItem[i], promotions) || 0;
    receiptItem.push({ cartItem: cartItem[i],
                       total: cartItem[i].item.price * (cartItem[i].number - promoteNumber),
                       save:  cartItem[i].item.price * promoteNumber });
  }
  return receiptItem;
}

function isPromote(cartItem, promotions) {
	for(var i = 0; i < promotions.length; i++)
		for(var j = 0; j < promotions[i].barcodes.length; j++)
			if(cartItem.item.barcode === promotions[i].barcodes[j]) {
				promoteNumber = parseInt(cartItem.number / 3);
				return promoteNumber;
			}
}
/*     Task4     */
function getReceipt(receiptItem) {
  var receipt = "***<没钱赚商店>收据***\n";
  var totalPrice = 0, totalSave = 0;
  for(var i = 0; i < receiptItem.length; i++){
    receipt += "名称：" + receiptItem[i].cartItem.item.name
            + "，数量：" + receiptItem[i].cartItem.number
            + receiptItem[i].cartItem.item.unit + "，单价："
            + receiptItem[i].cartItem.item.price.toFixed(2) + "(元)，小计："
            + receiptItem[i].total.toFixed(2) + "(元)\n";
    totalPrice += receiptItem[i].total;
    totalSave  += receiptItem[i].save;
	}
  receipt += "----------------------\n";
  receipt += "总计：" + totalPrice.toFixed(2) + "(元)\n";
  receipt += "节省：" + totalSave.toFixed(2) + "(元)\n";
  receipt += "**********************";
  console.log(receipt);
}
