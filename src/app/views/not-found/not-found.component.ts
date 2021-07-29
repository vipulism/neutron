import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: `<div class="container">
                    <div class="row not-found">
                        <div class="col-md-12 my-4 text-center">
                            <h1>404 Page not found</h1>
                        </div>
                    </div>
                </div>`
})
export class NotFoundComponent implements OnInit {

    constructor(
    ) {
    }

    ngOnInit(): void {

    }
}
