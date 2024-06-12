import { Component } from '@angular/core';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { getService } from 'src/app/services/get-service.service';
import { CategoryService } from 'src/app/services/category.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
    selector: 'app-pets',
    templateUrl: './pets.component.html',
    styleUrls: ['./pets.component.css']
})
export class PetsComponent {
    public faPaw = faPaw;

    public paramType: any = '';
    public paramSpecies: any = 'pho-bien';
    public dataCate: any = [];
    public dataPetlist: any = [];
    public dataPets: any = [];
    public listPet: any = [];

    public constructor(
        private titleService: Title, 
        private activatedRoute: ActivatedRoute, 
        private getService: getService,
        private categoryService: CategoryService,
        private petService: PetsService
    ) {
        this.titleService.setTitle('Thú cưng');
        $('html, body').animate({ scrollTop: 0, behavior: 'smooth' }, 0);

        this.activatedRoute.paramMap.subscribe(params => {
            this.paramType = params.get('type');
            this.paramSpecies = params.get('species') || 'pho-bien';
            this.categoryService.getAllCate('?slug=' + this.paramType, (err: boolean, data: any) => {
                if (!err && data.length !== 0) {
                    this.dataCate = data;
                    this.petService.getAllListPet('?category_id=' + data[0].id, (err: boolean, data: any) => {
                        if (!err) {
                            this.dataPetlist = data;
                            this.petService.getAllPets(undefined, (err: boolean, data: any) => {
                                if (!err) {
                                    this.dataPets = data.map((item: any) => {
                                        item.resources = JSON.parse(item.resources);
                                        const petlist = this.dataPetlist.find((elem: any) => elem.id === item.pet_list_id);
                                        return { ...item, petlist };
                                    }).sort((a: any, b: any) => a.id - b.id);
                                    if (this.paramSpecies === 'pho-bien') {
                                        this.listPet = this.dataPets.filter((item: any) => item.popular == 1 && this.dataPetlist.some((elem: any) => elem.id === item.pet_list_id));
                                    } else {
                                        this.listPet = this.dataPets.filter((item: any) => {
                                            const a = this.dataPetlist.find((a: any) => a.slug === this.paramSpecies);
                                            return item.pet_list_id === a.id;
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    handleEventBoxContentThree(data?: any) {
        // if(!data) this.listPet = this.dataPets.filter((item:any) => item.popular == 1 && this.dataPetlist.some((elem:any) => elem.id === item.pet_list_id));
        // else this.listPet = this.dataPets.filter((item:any) => item.pet_list_id === data.id);
    }

}
