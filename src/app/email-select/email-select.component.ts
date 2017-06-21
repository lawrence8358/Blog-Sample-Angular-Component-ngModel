import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { forwardRef } from '@angular/core';

//步驟 1
export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmailSelectComponent),
  multi: true
};


@Component({
  selector: 'app-email-select',
  templateUrl: './email-select.component.html',
  providers: [USER_PROFILE_VALUE_ACCESSOR]
})
export class EmailSelectComponent implements ControlValueAccessor {

datas: Observable<string[]>; //顯示的資料清單(RxJS中的可觀察物件)
searchSubject = new Subject<string>();  //要訂閱的事件(RxJS中的訂閱物件)
useEmail = ""; //輸入文字框
onChange: (value) => {}; //宣告一個事件

ngOnInit() {
  this.loadDataServiceSubject();
}

/**訂閱資料查詢服務 */
loadDataServiceSubject() {
  this.datas = this.searchSubject
    .debounceTime(300)        // 等候0.3秒後再執行送出
    .distinctUntilChanged()   // 忽略跟上一次一樣的輸入
    .switchMap(e => this.simulationService(e)) //查詢遠端資料
    .catch(error => { return Observable.of<string[]>([]); });
}

/**文字框 Keyup 事件 */
onEmailKeyup(value: string) {
  this.searchSubject.next(value); //執行訂閱服務
}

/**電子清單 Item Click 事件 */
onEmaiListClick(value) {
  if (this.onChange) this.onChange(value); //回傳異動資料
  this.searchSubject.next(""); //清空清單
}

/**模擬查詢遠端資料服務 */
simulationService(value): Observable<string[]> {
  let result: string[] = [];
  value = value.replace("@hotmail.com", "").replace("@google.com", "").replace("@primeeagle.net", "")
  if (value !== "") {
    result.push(value + "@hotmail.com");
    result.push(value + "@google.com");
    result.push(value + "@primeeagle.net");
  }
  return Observable.of<string[]>(result);
}

//用來接收資料繫結的來源端資料
writeValue(obj: any): void {
  this.useEmail = obj;
}

//初始化一個函數用來接收資料改變事件，用來處理資料繫結回傳資料。
registerOnChange(fn: any): void {
  this.onChange = fn;
}

//初始化一個函數用來接收Touched事件，用於處理資料繫結回傳資料
registerOnTouched(fn: any): void {
}

//當控制項的disabled屬性變更時會呼叫的方法
setDisabledState(isDisabled: boolean): void {
}

}
