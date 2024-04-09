import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';


@Injectable()
export class MessagesService {

    private errorsSubject = new BehaviorSubject<string[]>([]);

    errors$: Observable<string[]> = this.errorsSubject.asObservable()
        .pipe(
            filter(messages => messages && messages.length > 0)
        );

    showErrors(...errors: string[]) {
        this.subject.next(errors);
    }

    private subject = new BehaviorSubject<string[]>([]);

    successMessages$: Observable<string[]> = this.subject.asObservable()
        .pipe(
            filter(messages => messages && messages.length > 0)
        );

    showSuccessMessages(...successMessages: string[]) {
        this.subject.next(successMessages);
    }

}
