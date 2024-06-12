import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
// import 'src/assets/plugin/Product-Gallery-Image-Zoom/scripts/main.js';
import { faAngleDown, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { getService } from 'src/app/services/get-service.service';
import { PetsService } from 'src/app/services/pets.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-detail-pet',
    templateUrl: './detail-pet.component.html',
    styleUrls: ['./detail-pet.component.css']
})
export class DetailPetComponent {
    public faAngleDown = faAngleDown;
    public faPhone = faPhone;
    public faUser = faUser;

    public paramType: any = '';
    public paramSpecies: any = '';
    public paramName: any = '';
    public pet: any = { resources: '' };
    public dataPetMore: any = [];

    public constructor(private getService: getService, private activatedRoute: ActivatedRoute, public productService: ProductService, private titleService: Title, private petService: PetsService) {
        this.titleService.setTitle('Thú cưng');

        this.activatedRoute.paramMap.subscribe(params => {
            $('html, body').animate({ scrollTop: 0, behavior: 'smooth' }, 0);

            this.paramType = params.get('type');
            this.paramSpecies = params.get('species');
            this.paramName = params.get('name');
            this.petService.getAllPets('?slug=' + this.paramName, (err: boolean, data: any) => {
                if (!err) {
                    this.pet = { ...data[0], resources: JSON.parse(data[0].resources) };
                    this.pet.description = this.pet.description.replace('h2>', 'h4>');
                    this.petService.getAllPets('?pet_list_id=' + this.pet.pet_list_id, (err: boolean, data: any) => {
                        if (!err) {
                            this.dataPetMore = data.map((item: any) => ({ ...item, resources: JSON.parse(item.resources) })).filter((item: any) => item.id !== this.pet.id);
                        }
                    });
                }
            });
        });
    }
}
