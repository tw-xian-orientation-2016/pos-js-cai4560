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
	tags.forEach(function(tag) {
		var barcodeCount = getBarcodeCount(tag);
		var barcodeRecord = searchRecord(barcodeCount, barcodeList);
		if(barcodeRecord) {
			barcodeRecord.number += barcodeCount.number;
		}
		else {
			barcodeList.push(barcodeCount);
		}
  });
  return barcodeList;
}

function getBarcodeCount(tag){
  var dividedString= tag.split('-');
  var barcode = dividedString[0];
  var number = parseFloat(dividedString[1] || 1);
  return { barcode: barcode, number: number };
}

function searchRecord(barcodeCount, barcodeList) {
  for (var i = 0; i < barcodeList.length; i++) {
    if (barcodeList[i].barcode === barcodeCount.barcode) {
      return barcodeList[i];
		}
	}
}

/*     Task2     */
function marchBarcodeList(barcodeList) {
  var cartItem = [];
  var items = loadAllItems();
  for (var i = 0; i < barcodeList.length; i++)
    for (var j = 0; j < items.length; j++) {
      if(barcodeList[i].barcode === items[j].barcode) {
        cartItem.push({ item: items[j], number: barcodeList[i].number })
			}
    }
  return cartItem;
}

/*     Task3     */
function calculatePromotion(cartItem) {
  var receiptItem = [];
  var promotions = loadPromotions();
  for (var i = 0; i < cartItem.length; i++) {
    var promoteNumber = isPromote(cartItem[i], promotions) || 0;
    receiptItem.push({ cartItem: cartItem[i],
                       total: cartItem[i].item.price * (cartItem[i].number - promoteNumber),
                       save:  cartItem[i].item.price * promoteNumber });
  }
  return receiptItem;
}

function isPromote(cartItem, promotions) {
  for (var i = 0; i < promotions.length; i++)
    for (var j = 0; j < promotions[i].barcodes.length; j++) {
	  	if(cartItem.item.barcode === promotions[i].barcodes[j]) {
			// it needs to be extended if there are more promote type.
	    	promoteNumber = parseInt(cartItem.number / 3);
	    	return promoteNumber;
		}
	}
}
/*     Task4     */
function getReceipt(receiptItem) {
  var receipt = "***<没钱赚商店>收据***\n";
  var totalPrice = 0, totalSave = 0;
  for (var i = 0; i < receiptItem.length; i++){
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
