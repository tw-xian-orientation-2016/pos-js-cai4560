describe('pos', function () {
    var allItems;

    beforeEach(function () {
        allItems = loadAllItems();
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory();

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：13.50(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：-3.00(元)\n' +
            '名称：方便面，数量：1袋，单价：4.50(元)，小计：-4.50(元)\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });
});