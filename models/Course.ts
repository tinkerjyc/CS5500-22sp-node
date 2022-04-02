/**
 * @file Course data model
 */
import {Types} from "mongoose";

export default class Course {
    // private title: string = '';
    // private syllabus: string = '';
    // private credits: number = 0;
    // private sections: Types.ObjectId[] = [];
    //
    // public setTitle(title: string) : void {
    //     this.title = title;
    // }
    // public getTitle() : string {
    //     return this.title;
    // }

    private _title: string = '';

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    private _syllabus: string = '';

    get syllabus(): string {
        return this._syllabus;
    }

    set syllabus(value: string) {
        this._syllabus = value;
    }

    private _credits: number = 0;

    get credits(): number {
        return this._credits;
    }

    set credits(value: number) {
        this._credits = value;
    }

    private _sections: Types.ObjectId[] = [];

    get sections(): Types.ObjectId[] {
        return this._sections;
    }

    set sections(value: Types.ObjectId[]) {
        this._sections = value;
    }
}