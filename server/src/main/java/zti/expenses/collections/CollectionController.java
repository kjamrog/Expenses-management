package zti.expenses.collections;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import zti.expenses.user.ApplicationUser;
import zti.expenses.user.ApplicationUserRepository;

import java.util.List;


@RestController
@RequestMapping("/collections")
public class CollectionController {

    private CollectionRepository collectionRepository;
    private ApplicationUserRepository applicationUserRepository;

    public CollectionController(CollectionRepository collectionRepository, ApplicationUserRepository applicationUserRepository){
        this.collectionRepository = collectionRepository;
        this.applicationUserRepository = applicationUserRepository;
    }

    @PostMapping
    public Collection addCollection(@RequestBody Collection collection, Authentication auth) {
        ApplicationUser user = applicationUserRepository.findByAuth(auth);
        collection.setOwner(user);
        collectionRepository.save(collection);
        return collection;
    }

    @GetMapping
    public List<Collection> getCollections(Authentication auth) {
        ApplicationUser user = applicationUserRepository.findByAuth(auth);
        return collectionRepository.findCollectionsByOwner(user);
    }
}
